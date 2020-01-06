fetch('http://localhost:3000/api/programs/')
                .then(response => response.json())
                .then(programs => {
                    console.log(programs);
                });