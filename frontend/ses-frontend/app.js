fetch('http://localhost:5500/api/programs/')
                .then(response => response.json())
                .then(programs => {
                    console.log(programs);
                });