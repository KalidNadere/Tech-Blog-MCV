// Import the Express Router and the Post model from the 'models' directory
const router = require('express').Router();
const { Post } = require('../../models');

// Create a new post using the form input values from the dashboard page (template)
router.post('/', (req, res) => {
  // Create a new Post record in the database with data from the request body
  Post.create({
    title: req.body.post_title,        
    description: req.body.post_desc,   
    user_id: req.session.user_id,      
  })
    .then((dbPostData) => res.json(dbPostData)) 
    .catch((err) => {
      console.log(err);                 
      res.status(500).json(err);       
    });
});

// Delete a post
router.delete('/:id', (req, res) => {
  // Delete a Post record from the database based on the provided post ID
  Post.destroy({
    where: {
      id: req.params.id,               
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        // If no post is found with the provided ID, send a 404 response
        res.status(404).json({ message: 'No Post found with this id' });
        return;
      }
      res.json(dbUserData);            
    })
    .catch((err) => {
      console.log(err);                  
      res.status(500).json(err);        
    });
});

// Update a post
router.put('/:id', (req, res) => {
  // Update the title and description of an existing post in the database

  Post.update(
    {
      title: req.body.title,             
      description: req.body.description, 
    },
    {
      where: {
        id: req.params.id,               
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        // If no post is found with the provided ID, send a 404 response
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);       
    })
    .catch((err) => {
      console.log(err);                 
      res.status(500).json(err);    
    });
});

module.exports = router; 
