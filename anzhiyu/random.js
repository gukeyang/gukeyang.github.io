var posts=["posts/4a17b153.html","posts/4a17b152.html","posts/4a17b157.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};