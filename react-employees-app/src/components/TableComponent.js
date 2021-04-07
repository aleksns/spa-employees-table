import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  useTheme,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import * as services from "../services/services";

const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiToolbar-root": {
      color: colors.mainBtnText,
      background: colors.appBackground,
    },
    "& .MuiSelect-icon": {
      color: colors.mainBtnText,
      background: colors.appBackground,
    },
  },
  paginationToolbar: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const StyledPaginationBtn = withStyles((theme) => ({
  root: {
    color: colors.mainBtnText,
    "&.Mui-disabled": {
      color: colors.paginationBtnDisabled,
    },
    "&:hover": {
      background: colors.paginationBtnHover,
    },
  },
}))(IconButton);

const StyledTableCell = withStyles((theme) => ({
  root: {
    background: colors.main,
    color: colors.mainBtnText,
    fontSize: 15,
    fontWeight: 700,
  },
  body: {
    fontSize: 15,
    fontWeight: 700,
  },
}))(TableCell);

const StyledTableSortLabel = withStyles((theme) => ({
  root: {
    "&:hover": {
      color: colors.tableSortLabel,
    },
    "&$active": {
      color: colors.tableSortLabel,
    },
  },
  active: {},
  icon: {
    "& path": {
      color: colors.tableSortLabel,
    },
  },
}))(TableSortLabel);

const TableContainerCustom = (props) => (
  <Table size="small" stickyHeader="true">
    {props.children}
  </Table>
);

export default function TableComponent(records, headCells, filterFunction) {
  const classes = useStyles();

  const pages = [9, 30, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TableHeadCustom = () => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead className={classes.testCSS}>
        <TableRow className={classes.testCSS}>
          {headCells.map((headCell) => (
            <StyledTableCell
              className={classes.testCSS}
              key={headCell.id}
              align="left"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <StyledTableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "desc"}
                  onClick={() => {
                    goToFirstPage();
                    handleSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </StyledTableSortLabel>
              )}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const goToFirstPage = () => {
    if (page !== 0) {
      setPage(0);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function TablePaginationActions(props) {
    const theme = useTheme();
    const classes = useStyles();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.paginationToolbar}>
        <StyledPaginationBtn
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </StyledPaginationBtn>
        <StyledPaginationBtn
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </StyledPaginationBtn>
        <StyledPaginationBtn
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </StyledPaginationBtn>
        <StyledPaginationBtn
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </StyledPaginationBtn>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const TablePaginationCustom = () => (
    <TablePagination
      classes={{ root: classes.root }}
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );

  function tableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return tableSort(
      filterFunction.function(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TableContainerCustom,
    TableHeadCustom,
    TablePaginationCustom,
    recordsAfterPagingAndSorting,
    goToFirstPage,
  };
}
