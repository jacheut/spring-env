package cn.com.env.base.dao;

import cn.com.env.base.model.User;

public interface IUserDao {

	/**
     * 查询用户
     * @param user
     * @return
     */
    public User findUserById(int id);
}
