import React from 'react';
import Box from '@mui/material/Box';

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
            <h1>📚 Education</h1>
            <h2>Institute of Science Tokyo</h2>
            <p>
                Bachelor of Computer Science
                <br />
                April 2022 - Pressent
            </p>
        </Box>
    );
}