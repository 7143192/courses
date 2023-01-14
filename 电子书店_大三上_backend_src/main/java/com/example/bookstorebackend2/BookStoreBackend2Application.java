package com.example.bookstorebackend2;

import com.example.bookstorebackend2.entity.BookTag;
import com.example.bookstorebackend2.repository.BookTagRepository;
import com.example.bookstorebackend2.solr.BookObjectBinding;
import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

import java.util.ArrayList;
import java.util.List;

//@EnableMongoRepositories(basePackages = "com.example.bookstorebackend2")
@EnableNeo4jRepositories
@SpringBootApplication
public class BookStoreBackend2Application {
    @Bean
    public Connector connector(){
        Connector connector=new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setPort(8080);
        connector.setSecure(false);
        connector.setRedirectPort(8443);
        return connector;
    }

    @Bean
    public TomcatServletWebServerFactory tomcatServletWebServerFactory(Connector connector){
        TomcatServletWebServerFactory tomcat=new TomcatServletWebServerFactory(){
            @Override
            protected void postProcessContext(Context context) {
                SecurityConstraint securityConstraint=new SecurityConstraint();
                securityConstraint.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection=new SecurityCollection();
                collection.addPattern("/*");
                securityConstraint.addCollection(collection);
                context.addConstraint(securityConstraint);
            }
        };
        tomcat.addAdditionalTomcatConnectors(connector);
        return tomcat;
    }

    public static void main(String[] args) {
        SpringApplication.run(BookStoreBackend2Application.class, args);
    }

//    @Bean
//    CommandLineRunner bookstorebackend2(BookTagRepository bookTagRepository) {
//        return args -> {
//            bookTagRepository.deleteAll();
//
//            BookTag root = new BookTag("全部");
//
//            BookTag technology = new BookTag("科技类");
//            List<BookTag> techs = new ArrayList<>();
//            BookTag coding = new BookTag("代码");
//            techs.add(coding);
//            BookTag CS = new BookTag("CS");
//            techs.add(CS);
//            BookTag science = new BookTag("科学类");
//            techs.add(science);
//            BookTag theory = new BookTag("理论类");
//            techs.add(theory);
//
//            BookTag fiction = new BookTag("小说");
//            List<BookTag> fics = new ArrayList<>();
//            BookTag emotional = new BookTag("情感小说");
//            fics.add(emotional);
//            BookTag SF = new BookTag("科幻小说");
//            fics.add(SF);
//            BookTag novel = new BookTag("短篇小说");
//            fics.add(novel);
//            BookTag novelette = new BookTag("中篇小说");
//            fics.add(novelette);
//
//            BookTag literature = new BookTag("文学");
//            List<BookTag> lits = new ArrayList<>();
//            BookTag FT = new BookTag("古典文学");
//            lits.add(FT);
//            BookTag fable = new BookTag("纪实文学");
//            lits.add(fable);
//            BookTag YS = new BookTag("青春文学");
//            lits.add(YS);
//
//            bookTagRepository.save(root);
//            bookTagRepository.save(technology);
//            bookTagRepository.save(coding);
//            bookTagRepository.save(CS);
//            bookTagRepository.save(science);
//            bookTagRepository.save(theory);
//            bookTagRepository.save(fiction);
//
//            bookTagRepository.save(emotional);
//            bookTagRepository.save(SF);
//            bookTagRepository.save(novel);
//            bookTagRepository.save(novelette);
//            bookTagRepository.save(literature);
//            bookTagRepository.save(FT);
//            bookTagRepository.save(fable);
//            bookTagRepository.save(YS);
//
//            root = bookTagRepository.findByTagName(root.getTagName());
//            root.setChild(technology);
//            root.setChild(fiction);
//            root.setChild(literature);
//            bookTagRepository.save(root);
//
//            technology = bookTagRepository.findByTagName(technology.getTagName());
//            technology.setChild(techs);
//            bookTagRepository.save(technology);
//
//            fiction = bookTagRepository.findByTagName(fiction.getTagName());
//            fiction.setChild(fics);
//            bookTagRepository.save(fiction);
//
//            literature = bookTagRepository.findByTagName(literature.getTagName());
//            literature.setChild(lits);
//            bookTagRepository.save(literature);
//            System.out.println("Finish!\n");
//        };
//    }

    @Bean
    CommandLineRunner bookstorebackend2(BookTagRepository bookTagRepository){
        return args -> {
            List<BookTag> bookTagList = bookTagRepository.findRelatedTags("小说");
            for(BookTag bookTag : bookTagList)
                System.out.println(bookTag.getTagName());
        };
    }
}
