package spdn.be.sercurity.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import spdn.be.entity.News;
import spdn.be.repository.NewsRepository;

import spdn.be.sercurity.services.NewsService;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsRepository newsRepositry;

    @Override
    public void saveNewsToDB(MultipartFile file, String title, String content) {



    }

    @Override
    public Page<News> getAllNews(Pageable page) {
        return newsRepositry.findAll(page);
    }

    @Override
    public void addnews(News news) {
        newsRepositry.save(news);
    }

    @Override
    public void deleteNewsById(Long newsid) {
        newsRepositry.deleteById(newsid);
    }

    @Override
    public void updateNews(Long id,News news) {
        News newsS=new News();
        newsS=newsRepositry.findById(id).get();
        newsS.setContent(news.getContent());
        newsS.setTitle(news.getTitle());
        newsS.setNameurl(news.getNameurl());
        newsS.setImageurl(news.getImageurl());
        newsRepositry.save(newsS);
    }

    @Override
    public News getNews(long id) {
        News newsS=new News();
        newsS=newsRepositry.findById(id).get();
        return newsS;
    }


}
