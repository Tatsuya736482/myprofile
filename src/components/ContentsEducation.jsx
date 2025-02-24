import React from 'react';
import Box from '@mui/material/Box';
import TypeIt from "typeit-react";

export default function ContentsEducation() {
    return(
        <Box   
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            sx={{ p: 2, "& h2, & p": { margin: 0 } }}
          >
            
            <TypeIt options={{ speed: 35, waitUntilVisible: true, lifeLike: true, cursor: false  }}>
              <h1>📚 Education</h1>
            </TypeIt>
            <h2>Institute of Science Tokyo</h2>
            <p>
                Bachelor of Computer Science
                <br />
                April 2022 - Pressent
            </p>
        </Box>
    );
}