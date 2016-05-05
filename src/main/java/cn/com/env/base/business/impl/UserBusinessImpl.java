package cn.com.env.base.business.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.env.base.business.IUserBusiness;
import cn.com.env.base.model.User;
import cn.com.env.base.service.IUserService;

@Service
public class UserBusinessImpl implements IUserBusiness {
	
	@Autowired
	private IUserService userService;
	
	public User getUserById(int id) {
		return userService.findUserById(id);
	}

}
