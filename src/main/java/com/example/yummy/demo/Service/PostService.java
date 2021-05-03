package com.example.yummy.demo.Service;

import com.example.yummy.demo.Exceptions.exception.DatabaseDuplicateException;
import com.example.yummy.demo.Exceptions.exception.DatabaseNotFoundException;
import com.example.yummy.demo.Repository.PostRepo;
import com.example.yummy.demo.Repository.ProfileRepo;
import com.example.yummy.demo.Repository.UserRepo;
import com.example.yummy.demo.Request.CommentRequest;
import com.example.yummy.demo.Request.PostRequest;
import com.example.yummy.demo.Responses.PostResponse;
import com.example.yummy.demo.models.Dtos.PostDto;
import com.example.yummy.demo.models.Dtos.UserDto;
import com.example.yummy.demo.models.Post;
import com.example.yummy.demo.models.Profile;
import com.example.yummy.demo.models.User;
import com.example.yummy.demo.models.Wraper.Comment;
import com.example.yummy.demo.models.Wraper.Follow;
import com.example.yummy.demo.models.Wraper.Like;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProfileRepo profileRepo;

    final private int limit = 5;

    public PostResponse findAllPost(int page) {
        int count = postRepo.findAll().size();
        Pageable pageableRequest = PageRequest.of(page, limit, Sort.by("date").descending());
        Page<Post> page1 = postRepo.findAll(pageableRequest);
        List<Post> posts = page1.getContent();
        return new PostResponse(convertPostToDtos(posts), count);
    }

    public PostResponse findFollowsPost(int page, User user) {
        Profile profile = profileRepo.findByUser(user);
        List<Follow> follows = profile.getFollows();
        List<Post> posts = new ArrayList<>();
        for (Follow follow : follows) {
            posts.addAll(postRepo.findAllByUser(follow.getUser()));
        }
        int count = posts.size();

        //List<Post> pages = posts.subList(page * limit, page * limit + limit);
        return new PostResponse(convertPostToDtos(posts), count);
    }

    public PostResponse findPostByUserId(int page, String userId) {
        User user = userRepo.findBy_id(userId);
        int count = postRepo.findAllByUser(user).size();
        Pageable pageableRequest = PageRequest.of(page, limit, Sort.by("date").descending());
        Page<Post> page1 = postRepo.findAllByUser(user, pageableRequest);
        List<Post> posts = page1.getContent();
        return new PostResponse(convertPostToDtos(posts), count);
    }

    public PostDto findPostByPostId(String id) {
        Post post = postRepo.findBy_id(id);
        if (post == null) {
            throw new DatabaseNotFoundException("Post not found");
        }
        return convertPostToDto(post);
    }

    public void deletePost(String id, User user) {
        Post post = postRepo.findBy_id(id);
        if (post == null) {
            throw new DatabaseNotFoundException("Post not found");
        }
        if (!post.getUser().get_id().equals(user.get_id())) {
            throw new DatabaseNotFoundException("User not authorized");
        }

        postRepo.delete(post);
    }

    public PostDto savePost(PostRequest postRequest, User user) {
        String text = postRequest.getText();
        String yelpId = postRequest.getYelpId();
        String postName = postRequest.getPostName();
        String image_url = postRequest.getImage_url();
        String rating = postRequest.getRating();
        String price = postRequest.getPrice();
        String phone = postRequest.getPhone();
        String distance = postRequest.getDistance();
        String location = postRequest.getLocation();

        Post post = Post.builder()
                .userName(user.getName())
                .text(text)
                .user(user)
                .yelpId(yelpId)
                .postName(postName)
                .image_url(image_url)
                .rating(rating)
                .phone(phone)
                .price(price)
                .distance(distance)
                .date(new Date())
                .comments(new ArrayList<>())
                .likes(new ArrayList<>())
                .location(location)
                .build();
        postRepo.save(post);

        return convertPostToDto(post);
    }

    //like
    public List<Like> AddLike(String id, User user) {
        Post post = postRepo.findBy_id(id);
        if (AlreadyLike(post, user.get_id())) {
            throw new DatabaseDuplicateException("Post already liked");
        }
        post.getLikes().add(new Like(user, user.get_id()));
        postRepo.save(post);
        return post.getLikes();
    }

    public List<Like> RemoveLike(String id, User user) {
        Post post = postRepo.findBy_id(id);

        for (Like like : post.getLikes()) {
            if (like.getUserId().equals(user.get_id())) {
                post.getLikes().remove(like);
                postRepo.save(post);
                return post.getLikes();
            }
        }
        throw new DatabaseNotFoundException("Post has not yet been liked");
    }

    private boolean AlreadyLike(Post post, String userId) {
        for (Like like : post.getLikes()) {
            if (like.getUserId().equals(userId)) {
                return true;
            }
        }
        return false;
    }

    //comment
    public List<Comment> AddComment(String id, CommentRequest commentRequest, User user) {
        Post post = postRepo.findBy_id(id);

        Comment comment = Comment.builder()
                .text(commentRequest.getText())
                .date(new Date())
                .name(user.getName())
                .user(user)
                .build();
        post.getComments().add(comment);
        postRepo.save(post);
        return post.getComments();
    }

    public List<Comment> RemoveComment(String id, String comment_id, User user) {
        Post post = postRepo.findBy_id(id);
        int commentId = Integer.parseInt(comment_id);
        if (commentId >= post.getComments().size()) {
            throw new DatabaseNotFoundException("Comment does not exist");
        }
        Comment comment = post.getComments().get(commentId);

        if (!comment.getUser().get_id().equals(user.get_id()) &&
        !post.getUser().get_id().equals(user.get_id())) {
            throw new DatabaseNotFoundException("User not authorized");
        }
        post.getComments().remove(comment);
        postRepo.save(post);
        return post.getComments();
    }

    private List<PostDto> convertPostToDtos(List<Post> posts) {
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post : posts) {
            postDtos.add(convertPostToDto(post));
        }
        return postDtos;
    }

    private PostDto convertPostToDto(Post post) {
        PostDto postDto = PostDto.builder()
                ._id(post.get_id())
                .date(post.getDate())
                .distance(post.getDistance())
                .image_url(post.getImage_url())
                .location(post.getLocation())
                .phone(post.getPhone())
                .postName(post.getPostName())
                .price(post.getPrice())
                .rating(post.getRating())
                .text(post.getText())
                .userName(post.getUserName())
                .user(convertUserToDto(post.getUser()))
                .comments(new ArrayList<>(post.getComments()))
                .likes(new ArrayList<>(post.getLikes()))
                .yelpId(post.getYelpId())
                .build();
        return postDto;
    }

    private UserDto convertUserToDto(User user) {
        UserDto userDto = UserDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .date(user.getDate())
                ._id(user.get_id())
                .build();
        return userDto;
    }
}
