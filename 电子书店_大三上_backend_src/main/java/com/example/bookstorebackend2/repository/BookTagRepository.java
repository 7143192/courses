package com.example.bookstorebackend2.repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import com.example.bookstorebackend2.entity.BookTag;

import java.util.List;

public interface BookTagRepository extends Neo4jRepository<BookTag, Long> {
    BookTag findByTagName(String name);

    @Query(value = "MATCH (a:BookTag)-[:CHILD]->(BookTag)<-[:CHILD]-(b:BookTag) WHERE a.tagName CONTAINS $name RETURN b")
    List<BookTag> findRelatedTags(@Param("name") String tagName);
}
