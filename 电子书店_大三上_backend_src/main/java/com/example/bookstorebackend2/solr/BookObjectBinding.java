package com.example.bookstorebackend2.solr;

import com.example.bookstorebackend2.constant.SolrConstant;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.repository.BookRepository;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;

@Component
public class BookObjectBinding {

    @Autowired
    private BookRepository bookRepository;

    public void indexing() throws IOException, SolrServerException {
        final SolrClient client = getSolrClient();

        final List<Book> bookList = bookRepository.getBooks();
        for(Book b : bookList){
            final SolrBookObject solrBookObject = new SolrBookObject(b);
            final UpdateResponse response = client.addBean(SolrConstant.COLLECTION_NAME, solrBookObject);
        }

        client.commit(SolrConstant.COLLECTION_NAME);

        System.out.println("Solr: finish book indexing");

    }

    public List<Book> querying(String field_search, String keyword)
            throws IOException, SolrServerException {
        final SolrClient client = getSolrClient();

        final SolrQuery query = new SolrQuery(String.format("%s:%s",field_search, keyword));
        query.addField("bookId");
        query.addField("bookName");
        query.addField("bookAuthor");
        query.addField("description");
        query.addField("image");
        query.addField("IsbnNum");
        query.addField("keyword");
        query.setRows(50000);
        query.setSort("bookId", SolrQuery.ORDER.asc);
        System.out.println("query = " + query);
        final QueryResponse responseOne = client.query(SolrConstant.COLLECTION_NAME, query);
        System.out.println("reponseOne = " + responseOne);
        System.out.println("result = " + responseOne.getResults());
        List<Book> ans = new ArrayList<>();
        for(SolrDocument d : responseOne.getResults()) {
            final String id = String.valueOf(d.getFirstValue("bookId"));
            List<Book> bs = bookRepository.getBook(Integer.parseInt(id));
            Iterator<Book> it = bs.iterator();
            Book b = it.next();
            ans.add(b);
        }
        //使用HashSet进行去重
        HashSet h = new HashSet(ans);
        ans.clear();
        ans.addAll(h);
        Collections.sort(ans, new Comparator<Book>() {
            @Override
            public int compare(Book p1, Book p2) {
                return p1.getBookId() - p2.getBookId();
            }
        });//使用黎匿名比较器进行book的排序
        //final List<SolrBookObject> products = responseOne.getBeans(SolrBookObject.class);
        //return products;
        return ans;
    }

    public static SolrClient getSolrClient() {
        final String solrUrl = "http://localhost:8982/solr";
        return new HttpSolrClient.Builder(solrUrl)
                .withConnectionTimeout(10000)
                .withSocketTimeout(60000)
                .build();
    }
}
