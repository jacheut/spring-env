package cn.com.env.base.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.com.env.base.business.IUserBusiness;
import cn.com.env.base.model.User;

@Controller
@RequestMapping("user")
public class UserController {
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private IUserBusiness userBusiness;
	
	/**
	 * 访问  http://localhost:8080/spring-env/user
	 */
	@RequestMapping("")
	public String getUser(HttpServletRequest request){
		User user = userBusiness.getUserById(1);
		System.out.println("name=" + user.getUsername());
		request.setAttribute("user", user);
		log.info(user.getUsername());
		return "hello";
	}
}
