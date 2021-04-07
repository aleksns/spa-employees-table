import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { Paper, makeStyles, Toolbar } from "@material-ui/core";
import TableComponent from "../components/TableComponent";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DialogEmployeeForm from "../controls/DialogEmployeeForm";
import DialogConfirmation from "../controls/DialogConfirmation";
import axios from "axios";
import SearchWithSelect from "../controls/SearchWithSelect";
import ButtonCustom from "../controls/ButtonCustom";
import NotificationMessage from "../controls/NotificationMessage";
import * as services from "../services/services";
import TableContent from "../components/TableContent";

const url = "/api/employee";
const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  rootPaper: {
    position: "absolute",
    width: "95%",
    top: theme.spacing(5),
    margin: theme.spacing(5),
    backgroundColor: colors.paperMain,
  },
  addNewBtn: {
    marginTop: theme.spacing(2.7),
    position: "absolute",
    right: theme.spacing(2),
  },
}));

const headCells = services.getHeadCells();

export default function Employees() {
  const classes = useStyles();

  const [records, setRecords] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [openDialogForm, setDialogForm] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [isEditForm, setIsEditForm] = useState(false);

  const [openConfirmation, setOpenConfirmation] = useState({
    isOpen: false,
    idToDelete: "",
  });

  const [notification, setNotification] = useState({
    isOpen: false,
    severity: "",
    message: "",
  });

  const [filterFunction, setFilterFunction] = useState({
    function: (items) => {
      return items;
    },
  });

  const handleAddNewBtn = () => {
    setIsEditForm(false);
    setDialogForm(true);
    setRecordForEdit(null);
  };

  const handleEditBtn = (item) => {
    setRecordForEdit(item);
    setDialogForm(true);
    setIsEditForm(true);
  };

  const handleDeleteBtn = (item) => {
    setOpenConfirmation({ isOpen: true, idToDelete: item.id });
  };

  const {
    TableContainerCustom,
    TableHeadCustom,
    TablePaginationCustom,
    recordsAfterPagingAndSorting,
    goToFirstPage,
  } = TableComponent(records, headCells, filterFunction);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(url)
        .then((response) => {
          setRecords(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [updateStatus]);

  const showErrorNotification = () => {
    setNotification({
      isOpen: true,
      severity: "warning",
      message: "Error: something went wrong!",
    });
  };

  const showDeleteNotification = (id) => {
    setNotification({
      isOpen: true,
      severity: "info",
      message: "Employee with ID " + id + " was deleted!",
    });
  };

  const showSuccessNotification = (isEditMessage, id) => {
    if (isEditMessage) {
      setNotification({
        isOpen: true,
        severity: "success",
        message:
          "Employee with ID " +
          JSON.stringify(id) +
          " was successfully edited!",
      });
    } else {
      setNotification({
        isOpen: true,
        severity: "success",
        message: "Employee was added!",
      });
    }
  };

  const addOrEditEmployee = async (values, resetForm) => {
    if (isEditForm) {
      axios
        .put(`${url}/${values.id}`, values)
        .then((response) => console.log(response.data))
        .catch((error) => {
          console.log(error);
          showErrorNotification();
          return;
        });
      setIsEditForm(false);
      showSuccessNotification(true, values.id);
    } else {
      axios
        .post(url, values)
        .then((response) => console.log(response.data))
        .catch((error) => {
          console.log(error);
          showErrorNotification();
          return;
        });
      showSuccessNotification(false, values.id);
    }

    resetForm();
    setDialogForm(false);
    setTimeout(() => {
      setUpdateStatus(!updateStatus);
    }, 500);
  };

  function deleteEmployee(id) {
    axios.delete(`${url}/${id}`).then((response) => {
      console.log(response.data);
    });
    setRecords(records.filter((element) => element.id != id));
    showDeleteNotification(JSON.stringify(id));
  }

  return (
    <>
      <Paper classes={{ root: classes.rootPaper }} elevation="0">
        <Toolbar>
          <SearchWithSelect
            setFilterFunction={setFilterFunction}
            goToFirstPage={goToFirstPage}
          />
          <ButtonCustom
            className={classes.addNewBtn}
            variant="contained"
            label="Add Employee"
            size="large"
            startIcon={<PersonAddIcon />}
            onClick={handleAddNewBtn}
          />
        </Toolbar>
        <TableContainerCustom>
          <TableHeadCustom />
          <TableContent
            recordsAfterPagingAndSorting={recordsAfterPagingAndSorting}
            handleEditBtn={handleEditBtn}
            handleDeleteBtn={handleDeleteBtn}
          />
        </TableContainerCustom>
        <TablePaginationCustom />
      </Paper>
      <DialogEmployeeForm
        isEditForm={isEditForm}
        openDialogForm={openDialogForm}
        setDialogForm={setDialogForm}
        recordForEdit={recordForEdit}
      >
        <EmployeeForm
          recordForEdit={recordForEdit}
          addOrEditEmployee={addOrEditEmployee}
          isEditForm={isEditForm}
        />
      </DialogEmployeeForm>
      <NotificationMessage
        notification={notification}
        setNotification={setNotification}
      />
      <DialogConfirmation
        openConfirmation={openConfirmation}
        setOpenConfirmation={setOpenConfirmation}
        onConfirm={() => deleteEmployee(openConfirmation.idToDelete)}
      />
    </>
  );
}
