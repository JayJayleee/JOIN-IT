package com.asrai.joinit.admin;


import com.asrai.joinit.domain.Admin;
import com.asrai.joinit.domain.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

	@Query("select a from Admin a where a.adminId = :adminId")
	Admin findByAdminId(String adminId);



}
