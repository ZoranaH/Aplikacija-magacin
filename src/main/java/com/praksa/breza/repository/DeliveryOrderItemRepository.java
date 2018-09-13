package com.praksa.breza.repository;

import java.util.List;

import com.praksa.breza.domain.DeliveryOrderItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DeliveryOrderItem entity.
 * 	 * @param id
	 * @return
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryOrderItemRepository extends JpaRepository<DeliveryOrderItem, Long> {
    /**
	 * Returns all instances of the type with the given IDs.
	 * 
	 * @param id
	 * @return
	 */
	List<DeliveryOrderItem> findAllByDeliveryOrderId(Long id);
}
