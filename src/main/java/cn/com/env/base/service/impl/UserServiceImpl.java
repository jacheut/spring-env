package cn.com.env.base.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.com.env.base.dao.IUserDao;
import cn.com.env.base.model.User;
import cn.com.env.base.service.IUserService;

/**
 * 事务在service层
 */
@Service("userService")
@Transactional
public class UserServiceImpl implements IUserService {
	@Resource
	private IUserDao userDao;

	public User findUserById(int id) {
		return userDao.findUserById(id);
	}

	public void test() {
		System.out.println(1111);
	}
}
