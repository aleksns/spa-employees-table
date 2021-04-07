package com.aleksns.employees.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aleksns.employees.application.employee.Employee;
import com.aleksns.employees.application.service.ApplicationService;

@RestController
@RequestMapping("/api")
public class ApplicationController {

	@Autowired
	private ApplicationService applicationService;

	@GetMapping("/employee")
	public List<Employee> get() {
		return applicationService.get();
	}

	@PostMapping("/employee")
	public Employee save(@RequestBody Employee employee) {
		applicationService.save(employee);
		return employee;
	}

	@GetMapping("/employee/{id}")
	public Employee get(@PathVariable int id) {
		return applicationService.get(id);
	}

	@DeleteMapping("/employee/{id}")
	public String delete(@PathVariable int id) {
		applicationService.delete(id);
		return "Employee with id #" + id + " was removed";
	}

	@PutMapping("/employee/{id}")
	public Employee update(@RequestBody Employee employee, @PathVariable String id) {
		applicationService.save(employee);
		return employee;
	}

}
