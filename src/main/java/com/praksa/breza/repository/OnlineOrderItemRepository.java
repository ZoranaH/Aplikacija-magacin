package com.praksa.breza.repository;

import java.util.List;
import java.util.Optional;
import com.praksa.breza.domain.OnlineOrderItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OnlineOrderItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OnlineOrderItemRepository extends JpaRepository<OnlineOrderItem, Long> {

    /**
	 * Returns all instances of the type with the given IDs.
	 * 
	 * @param id
	 * @return
	 */
	List<OnlineOrderItem> findAllByOnlineOrderId(Long id);
}
