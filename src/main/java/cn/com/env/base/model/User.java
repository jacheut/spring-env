package cn.com.env.base.model;

import org.apache.ibatis.type.Alias;

@Alias("user")
public class User {
	
	private int id;
    private String username;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
    
}
