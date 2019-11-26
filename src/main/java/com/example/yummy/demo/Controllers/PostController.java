package com.example.yummy.demo.Controllers;

import com.example.yummy.demo.Request.CommentRequest;
import com.example.yummy.demo.Request.PostRequest;
import com.example.yummy.demo.Responses.TextResponse;
import com.example.yummy.demo.Service.MapValidationErrorService;
import com.example.yummy.demo.Service.PostService;
import com.example.yummy.demo.models.Dtos.PostDto;
import com.example.yummy.demo.models.User;
import com.example.yummy.demo.models.Wraper.Comment;
import com.example.yummy.demo.models.Wraper.Like;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping()
    public ResponseEntity<?> findAllPost(@RequestParam(value = "page", defaultValue = "0") int page) {
        return ResponseEntity.ok(postService.findAllPost(page - 1));
    }

    @GetMapping("/follows")
    public ResponseEntity<?> findFollowsPost(@RequestParam(value = "page", defaultValue = "0") int page, Authentication authentication) {
        return ResponseEntity.ok(postService.findFollowsPost(page - 1, (User)authentication.getPrincipal()));
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> findPostByUserId(@PathVariable String user_id,
                                              @RequestParam(value = "page", defaultValue = "0") int page) {
        return ResponseEntity.ok(postService.findPostByUserId(page - 1, user_id));
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<?> findPostByPostId(@PathVariable String id) {
        return ResponseEntity.ok(postService.findPostByPostId(id));
    }

    @PostMapping()
    public ResponseEntity<?> savePost(@Valid @RequestBody PostRequest postRequest, Authentication authentication, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        PostDto postDto = postService.savePost(postRequest, (User)authentication.getPrincipal());
        return ResponseEntity.ok(postDto);
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<?> deletePost(@PathVariable String id, Authentication authentication) {
        postService.deletePost(id, (User)authentication.getPrincipal());
        return ResponseEntity.ok(new TextResponse("Post removed"));
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<?> AddLike(@PathVariable String id, Authentication authentication) {
        List<Like> likes = postService.AddLike(id, (User)authentication.getPrincipal());
        return ResponseEntity.ok(likes);
    }

    @PutMapping("/unlike/{id}")
    public ResponseEntity<?> RemoveLike(@PathVariable String id, Authentication authentication) {
        List<Like> likes = postService.RemoveLike(id, (User)authentication.getPrincipal());
        return ResponseEntity.ok(likes);
    }

    @PostMapping("/comment/{id}")
    public ResponseEntity<?> AddComment(@PathVariable String id, @Valid @RequestBody CommentRequest commentRequest, BindingResult result, Authentication authentication) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        List<Comment> comments = postService.AddComment(id, commentRequest, (User)authentication.getPrincipal());
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/comment/{id}/{comment_id}")
    public ResponseEntity<?> RemoveComment(@PathVariable String id, @PathVariable String comment_id, Authentication authentication) {
        List<Comment> comments = postService.RemoveComment(id, comment_id, (User)authentication.getPrincipal());
        return ResponseEntity.ok(comments);
    }
}
