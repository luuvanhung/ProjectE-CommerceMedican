package spdn.be.sercurity.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import spdn.be.entity.News;


public interface NewsService {


    void saveNewsToDB(MultipartFile file, String title, String content);

    Page<News> getAllNews(Pageable page);

    void addnews(News news);

    void deleteNewsById(Long id);

    void updateNews(Long id,News news);

    News getNews(long id);
}
