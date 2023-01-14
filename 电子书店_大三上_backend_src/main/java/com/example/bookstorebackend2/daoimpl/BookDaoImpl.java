package com.example.bookstorebackend2.daoimpl;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.BookImage;
import com.example.bookstorebackend2.repository.BookRepository;
import com.example.bookstorebackend2.dao.BookDao;
import com.example.bookstorebackend2.utils.RedisUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisConnectionUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.*;
import java.util.Optional;
import com.alibaba.fastjson.JSON;
import com.example.bookstorebackend2.repository.BookImageRepository;
import com.example.bookstorebackend2.entity.BookTag;
import com.example.bookstorebackend2.repository.BookTagRepository;

@Repository
public class BookDaoImpl implements BookDao{
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private RedisUtil redisUtil;
    @Autowired
    private BookImageRepository bookImageRepository;
    @Autowired
    private BookTagRepository bookTagRepository;

    public Book getSingleBook(int id)
    {
        List<Book> book = bookRepository.getBook(id);
        Iterator<Book> iter = book.iterator();
        if(!iter.hasNext()){
            System.out.println("can't find the book!");
            return null;
        }
        return iter.next();
    }

    @Override
    public List<Book> getBooks()
    {
        /*
        long size = redisUtil.lGetListSize("books");
        if(size == 0) {
            System.out.println("没有从redis中获取到书籍信息!");
            List<Book> books = bookRepository.getBooks();
            //redisUtil.lSet("books", books);
            for(Book book : books) {
                redisUtil.lSet("books", JSON.toJSONString(book));
            }
            return books;
        }
        System.out.println("从redis获取了所有书籍信息!");
        Object got = redisUtil.lGet("books", 0, size - 1);
        List<Book> ans = new ArrayList<>();
        for(Object o : (List<?>)got) {
            System.out.println("o = " + o);
            ans.add(JSON.parseObject(o.toString(), Book.class));
        }
        return ans;
        */
        List<Book> books = bookRepository.getBooks();
        for(Book b : books) {
            int id = b.getBookId();
            //String image = String.valueOf(bookImageRepository.findById(id));
            //b .setImage(image);
            Optional<BookImage> bookImage = bookImageRepository.findById(id);
            if(bookImage.isPresent()) {
                System.out.println("获取的图片信息为：" + bookImage.get().getImage());
                b.setBookImage(bookImage.get());
                //b.setImage(bookImage.get().getImage());//将书籍对应的图片信息设置为从mongodb中获取的数据
            }
            else {
                System.out.println("未获取到图书信息!");
            }
        }
        return books;
    }

    @Override
    public Book getBook(int id)
    {
//        Object got = redisUtil.get("book" + id);
//        if(got == null) {
//            System.out.println("没有从redis中获取到书籍" + id + "的信息!");
//            List<Book> book = bookRepository.getBook(id);
//            Iterator<Book> iter = book.iterator();
//            if(!iter.hasNext()){
//                System.out.println("can't find the book!");
//                return null;
//            }
//            Book gotbook = iter.next();
//            redisUtil.set("book" + id, JSON.toJSONString(gotbook));//将数据放入redis
//            return gotbook;
//        }
//        Book ans = JSON.parseObject(got.toString(), Book.class);
//        System.out.println("从redis中获取到了书籍" + id + "的信息!");
//        System.out.println("o = " + got.toString());
//        return ans;
        List<Book> book = bookRepository.getBook(id);
        Iterator<Book> iter = book.iterator();
        if(!iter.hasNext()) {
            System.out.println("没有找到这本书!");
            return null;
        }
        Book got = iter.next();
        Optional<BookImage> bookImage = bookImageRepository.findById(id);
        got.setBookImage(bookImage.get());
        return got;
    }

    @Override
    public Book deleteBook(int id)
    {
        if(redisUtil.hasKey("books")) {
            System.out.println("再删除书籍" + id + "信息之前booksList redis cache已经存在，先移除旧值!");
            redisUtil.del("books");
        }
        if(redisUtil.hasKey("book" + id)) {
            System.out.println("在删除书籍" + id + "信息之前这本书对应信息已经存在在redis中,先移除旧的信息!");
            redisUtil.del("book" + id);
        }
        Book del = getSingleBook(id);
        bookRepository.delete(del);
        bookRepository.flush();
        //因为删除一本书之后需要重新访问书籍列表，所以把新的列表放入cache中去
        System.out.println("将删除了书籍" + id + "之后的新的BooksList信息缓存在redis cache中!");
        List<Book> books = bookRepository.getBooks();
        for(Book book : books) {
            redisUtil.lSet("books", JSON.toJSONString(book));
        }
        return del;//删除成功
    }

    @Override
    public Book updateNowPrice(int bookId, int nowPrice)
    {
        if(redisUtil.hasKey("book" + bookId)) {
            System.out.println("在修改书籍" + bookId + "的现在价格时发现旧数据已经放入cache,先移除旧信息!");
            redisUtil.del("book" + bookId);
        }
        if(redisUtil.hasKey("books")) {
            System.out.println("在修改书籍" + bookId + "现在价格时先将旧的cache中的BooksList移除!");
            redisUtil.del("books");
        }
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set now_price = ? where book_id = ?";
        Object[] args = {nowPrice, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setNowPrice(nowPrice);
        bookRepository.save(book);
        bookRepository.flush();
        System.out.println("将修改之后的书籍" + bookId + "新的信息放入redis cache!");
        System.out.println("新的信息为：" + JSON.toJSONString(book));
        redisUtil.set("book" + bookId, JSON.toJSONString(book));
        return book;
    }

    @Override
    public Book updatePrevPrice(int bookId, int prevPrice)
    {
        if(redisUtil.hasKey("book" + bookId)) {
            System.out.println("在修改书籍" + bookId + "的原始价格时发现旧数据已经放入cache,先移除旧信息!");
            redisUtil.del("book" + bookId);
        }
        if(redisUtil.hasKey("books")) {
            System.out.println("在修改书籍" + bookId + "原始价格时先将旧的cache中的BooksList移除!");
            redisUtil.del("books");
        }
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set prev_price = ? where book_id = ?";
        Object[] args = {prevPrice, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setPrevPrice(prevPrice);
        bookRepository.save(book);
        bookRepository.flush();
        System.out.println("将修改之后的书籍" + bookId + "新的信息放入redis cache!");
        System.out.println("新的信息为：" + JSON.toJSONString(book));
        redisUtil.set("book" + bookId, JSON.toJSONString(book));
        return book;
    }

    @Override
    public Book updateImage(int bookId, String image)
    {
        Book book = getSingleBook(bookId);
//        /*String sql = "update bookslist set image = ? where book_id = ?";
//        Object[] args = {image, bookId};
//        jdbcTemplate.update(sql, args);*/
//        book.setImage(image);
//        bookRepository.save(book);
//        bookRepository.flush();
        return book;
    }

    @Override
    public Book updateISBN(int bookId, int isbn)
    {
        //缓存存在与内存中，则先删除旧的缓存
        if(redisUtil.hasKey("book" + bookId)) {
            System.out.println("修改ISBN值之前对应cache存在，先移除旧的redis cache!");
            redisUtil.del("book" + bookId);
        }
        if(redisUtil.hasKey("books")) {
            System.out.println("修改书籍" + bookId + "信息之前所有书籍信息已经在redis中,先移除旧的redis cache!");
            redisUtil.del("books");
        }
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set isbn = ? where book_id = ?";
        Object[] args = {isbn, bookId};
        jdbcTemplate.update(sql, args);
        book.setIsbnNum(isbn);*/
        book.setIsbnNum(isbn);
        bookRepository.save(book);
        bookRepository.flush();
        //将新的书籍信息重新放入redis
        System.out.println("将修改之后的书籍" + bookId + "新的信息放入redis cache!");
        System.out.println("新的信息为：" + JSON.toJSONString(book));
        redisUtil.set("book" + bookId, JSON.toJSONString(book));
        return book;
    }

    @Override
    public Book updateStoreNum(int bookId, int num)
    {
        if(redisUtil.hasKey("book" + bookId)) {
            System.out.println("在修改书籍" + bookId + "的库存量时发现旧数据已经放入cache,先移除旧信息!");
            redisUtil.del("book" + bookId);
        }
        if(redisUtil.hasKey("books")) {
            System.out.println("在修改书籍" + bookId + "库存量时先将旧的cache中的BooksList移除!");
            redisUtil.del("books");
        }
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set store_num = ? where book_id = ?";
        Object[] args = {num, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setStoreNum(num);
        bookRepository.save(book);
        bookRepository.flush();
        System.out.println("将修改之后的书籍" + bookId + "新的信息放入redis cache!");
        System.out.println("新的信息为：" + JSON.toJSONString(book));
        redisUtil.set("book" + bookId, JSON.toJSONString(book));
        return book;
    }

    @Override
    public Book updateName(int bookId, String name)
    {
        if(redisUtil.hasKey("book" + bookId)) {
            System.out.println("在修改书籍" + bookId + "的书名时发现旧数据已经放入cache,先移除旧信息!");
            redisUtil.del("book" + bookId);
        }
        if(redisUtil.hasKey("books")) {
            System.out.println("在修改书籍" + bookId + "书名时先将旧的cache中的BooksList移除!");
            redisUtil.del("books");
        }
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set book_name = ? where book_id = ?";
        Object[] args = {name, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setBookName(name);
        bookRepository.save(book);
        bookRepository.flush();
        System.out.println("将修改之后的书籍" + bookId + "新的信息放入redis cache!");
        System.out.println("新的信息为：" + JSON.toJSONString(book));
        redisUtil.set("book" + bookId, JSON.toJSONString(book));
        return book;
    }

    @Override
    public Book updateAuthor(int bookId, String author)
    {
        if(redisUtil.hasKey("book" + bookId)) {
            System.out.println("在修改书籍" + bookId + "的作者时发现旧数据已经放入cache,先移除旧信息!");
            redisUtil.del("book" + bookId);
        }
        if(redisUtil.hasKey("books")) {
            System.out.println("在修改书籍" + bookId + "作者时先将旧的cache中的BooksList移除!");
            redisUtil.del("books");
        }
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set book_author = ? where book_id = ?";
        Object[] args = {author, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setBookAuthor(author);
        bookRepository.save(book);
        bookRepository.flush();
        System.out.println("将修改之后的书籍" + bookId + "新的信息放入redis cache!");
        System.out.println("新的信息为：" + JSON.toJSONString(book));
        redisUtil.set("book" + bookId, JSON.toJSONString(book));
        return book;
    }

    @Override
    public List<Book> searchBook(String info)
    {
        List<Book> books = bookRepository.getBooks();
        List<Book> ans = new ArrayList<>();
        if(Objects.equals(info, "") || info == null) return books;
        for(Book book : books){
            String name = book.getBookName();
            if(name.toLowerCase().contains(info.toLowerCase())){
                System.out.println("符合条件的输信息:"+book.getBookName()+"," + book.getBookId());
                ans.add(book);
            }
        }
        return ans;
    }

    @Override
    public Book makeBookShown()
    {
        if(redisUtil.hasKey("books")) {
            System.out.println("在插入一本新的书籍之前BooksList的信息已经缓存在redis中,先移除旧的cache信息!");
            redisUtil.del("books");
        }
        List<Book> notShown = bookRepository.getNotShownBooks();
        Iterator<Book> iter = notShown.iterator();
        if(!iter.hasNext()){
            Book got = new Book();
            got.setBookId(-1);
            return got;
        }
        Book book = iter.next();
        book.setIsShown(0);
        bookRepository.save(book);
        bookRepository.flush();
        System.out.println("新添加的书籍信息为:" + JSON.toJSONString(book));
        System.out.println("将新加入的书籍" + book.getBookId() + "信息放入redis cache中!");
        redisUtil.set("book" + book.getBookId(), JSON.toJSONString(book));
        System.out.println("将添加了一本新书之后的新的书籍列表信息放入redis cache!");
        List<Book> books = bookRepository.getBooks();
        for(Book b : books) {
            redisUtil.lSet("books", JSON.toJSONString(b));
        }
        return book;
    }

    @Override
    public List<Book> SearchByTag(String tag)
    {
        List<BookTag> tags = bookTagRepository.findRelatedTags(tag);//获取相关联的标签
        List<String> str = new ArrayList<>();
        for(BookTag b : tags) {
            str.add(b.getTagName());
        }//获取每个标签对应的字符串
        List<Book> all = bookRepository.getBooks();
        //List<Book> ans = new ArrayList<>();
        Set<Book> tmp = new HashSet<>();
        for(String s : str) {
            for(Book b : all) {
                String key = b.getKeyword();
                if(key.contains(s)) {
                    tmp.add(b);
                }
            }
        }//用set存储书中keyword包含str的书籍信息
        List<Book> ans = new ArrayList<>(tmp);
        for(Book b : ans) {
            Optional<BookImage> bookImage = bookImageRepository.findById(b.getBookId());
            if(bookImage.isPresent()) {
                b.setBookImage(bookImage.get());
            }
        }//get the corresponding image info from the mongoDB.
        for(Book b : ans) {
            System.out.println("获取的图书图片信息为:" + b.getBookImage().getImage());
        }
        return ans;
    }
}
