package com.example.bookstorebackend2.entity;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Node
public class BookTag {
    @Id
    @GeneratedValue
    private Long id;

    private String tagName;

    @Relationship(type = "CHILD", direction = Relationship.Direction.INCOMING)
    public Set<BookTag> children;

    public BookTag() {}

    public BookTag(String name) {this.tagName = name;}

    public void setChild(BookTag b) {
        if(children == null) {
            children = new HashSet<>();
        }
        children.add(b);
    }

    public void setChild(List<BookTag> tags) {
        if(children == null) {
            children = new HashSet<>();
        }
        children.addAll(tags);
    }

    public String getTagName() {
        return this.tagName;
    }
}
