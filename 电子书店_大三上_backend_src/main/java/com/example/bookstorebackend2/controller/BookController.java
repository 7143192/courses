package com.example.bookstorebackend2.controller;
import com.example.bookstorebackend2.constant.SolrConstant;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.service.BookService;
import com.example.bookstorebackend2.solr.BookObjectBinding;
import com.example.bookstorebackend2.solr.SolrBookObject;
import org.apache.solr.client.solrj.SolrServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private BookObjectBinding bookObjectBinding;

    //@CrossOrigin
    @RequestMapping("/getBooks")
    public @ResponseBody List<Book> getBooks()
    {
        return bookService.getBooks();
    }

    //@CrossOrigin
    @RequestMapping("/getBook")
    public @ResponseBody Book getBook(@RequestParam("id") int id)
    {
        return bookService.getBook(id);
    }

    //@CrossOrigin
    @RequestMapping("/delBook")
    public @ResponseBody Book deleteBook(@RequestParam("id") int id)
    {
        return bookService.deleteBook(id);
    }

    //@CrossOrigin
    @RequestMapping("/updateNowPrice")
    public @ResponseBody Book updateNowPrice(@RequestParam("id") int bookId,
                                             @RequestParam("price") int nowPrice)
    {
        return bookService.updateNowPrice(bookId, nowPrice);
    }

    //@CrossOrigin
    @RequestMapping("/updatePrevPrice")
    public @ResponseBody Book updatePrevPrice(@RequestParam("id") int bookId,
                                             @RequestParam("price") int prevPrice)
    {
        return bookService.updatePrevPrice(bookId, prevPrice);
    }

    //@CrossOrigin
    @RequestMapping("/updateImage")
    public @ResponseBody Book updateImage(@RequestParam("id") int bookId,
                                          @RequestParam("image") String image)
    {
        return bookService.updateImage(bookId, image);
    }

    @RequestMapping("/updateISBN")
    public @ResponseBody Book updateISBN(@RequestParam("id") int bookId,
                                          @RequestParam("isbn") int isbn)
    {
        return bookService.updateISBN(bookId, isbn);
    }

    @RequestMapping("/updateStoreNum")
    public @ResponseBody Book updateStoreNum(@RequestParam("id") int bookId,
                                         @RequestParam("num") int storeNum)
    {
        return bookService.updateStoreNum(bookId, storeNum);
    }

    @RequestMapping("/updateName")
    public @ResponseBody Book updateName(@RequestParam("id") int bookId,
                                             @RequestParam("name") String bookName)
    {
        return bookService.updateName(bookId, bookName);
    }

    @RequestMapping("/updateAuthor")
    public @ResponseBody Book updateAuthor(@RequestParam("id") int bookId,
                                         @RequestParam("author") String bookAuthor)
    {
        return bookService.updateAuthor(bookId, bookAuthor);
    }

    @RequestMapping("/searchBook")
    public @ResponseBody List<Book> searchBook(@RequestParam("info") String info)
    {
        return bookService.searchBook(info);
    }

    @RequestMapping("/bookShown")
    public @ResponseBody Book makeBookShown()
    {
        return bookService.makeBookShown();
    }

    @RequestMapping(path = "/indexing")
    public @ResponseBody String indexing() throws SolrServerException, IOException {
        bookObjectBinding.indexing();
        return "OK";
    }

    @RequestMapping(path = "/querying")
    public @ResponseBody List<Book> queryingDescription(@RequestParam("keyword") String keyword)
            throws SolrServerException, IOException {
        List<Book> list = bookObjectBinding.querying(SolrConstant.DESCRIPTION_NAME, keyword);
//        System.out.println("got list = " + list);
//        List<Book> ans = new ArrayList<>();
//        for(SolrBookObject s : list) {
//            Book b = bookService.getBook(Integer.parseInt(s.getBookId()));
//            ans.add(b);
//        }
//        return ans;
        System.out.println("query_list = " + list);
        return list;
    }

    @RequestMapping(path = "/searchByTag")
    public @ResponseBody List<Book> SearchByTag(@RequestParam("tag") String tag) {
        return bookService.SearchByTag(tag);
    }
}
