package com.example.sportapp_backend.repository;

import com.example.sportapp_backend.entity.Moment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MomentRepository extends JpaRepository<Moment, Integer> {
    @Query("select m from Moment m")
    List<Moment> getAllMoments();

    @Query("from Moment where user_id= :user_id")
    List<Moment> getMomentsById(@Param("user_id") int user_id);

    @Query(value = "select * from moments where moment_id > :cur limit :size",
            nativeQuery = true)
    List<Moment> getLimitedMoment(@Param("cur") int cur, @Param("size") int size);

    @Query(value = "select * from moments order by moment_id desc limit 1",
            nativeQuery = true)
    Moment getLastMoment();

    @Query(value="select * from moments where moment_id > :cur limit :size",
            nativeQuery = true)
    List<Moment> getDescLimitedMoment(@Param("cur") int cur, @Param("size") int size);
}
