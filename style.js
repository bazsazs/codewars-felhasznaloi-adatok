let userData = null;

        // Felhasználói adatok lekérése a Codewars API-ról
        function fetchUserData() {
            const username = document.getElementById('username').value;
            const url = `https://www.codewars.com/api/v1/users/${username}`;

            fetch(url)
                .then(response => {
                    if (response.status === 404) {
                        showErrorPage();
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    if (data) {
                        userData = data;
                        showTotalPoints(); // Alapértelmezetten összesített pontok jelenjenek meg
                    }
                })
                .catch(error => {
                    console.error('Hiba történt:', error);
                    showErrorPage();
                });
        }

        // Összesített pontok megjelenítése
         function showTotalPoints() {
            if (!userData) return;
            const content = document.getElementById('content');
            const totalPoints = userData.ranks.overall.score;
            const username = document.getElementById('username').value;
            content.innerHTML = `<h2>${username} Összesített pontjai: </h2><p>${totalPoints} pont</p>`;
        }
        
        

        // Pontok nyelvek szerint megjelenítése
        function showPointsByLanguage() {
            if (!userData) return;
            const content = document.getElementById('content');
            const languages = userData.ranks.languages;
            const username = document.getElementById('username').value;
        
            // Ellenőrzés, ha nincs adat a nyelvek szerint
            if (!languages || Object.keys(languages).length === 0) {
                content.innerHTML = `<h2>${username} pontjai nyelvek szerint:</h2><p>Nincs elérhető adat a nyelvek szerint.</p>`;
                return;
            }
        
            // Hozzáadja a felhasználónevet a címhez
            let html = `<h2>${username} pontjai nyelvek szerint:</h2><ul>`;
            for (const [language, data] of Object.entries(languages)) {
                html += `<li>${language}: ${data.score} pont</li>`;
            }
            html += '</ul>';
            content.innerHTML = html;
        }
        
        


        // 404-es hibaoldal megjelenítése
        function showErrorPage() {
            const content = document.getElementById('content');
            content.innerHTML = `<h2 class="error">404 - Felhasználó nem található</h2><p>Az adott felhasználó nem létezik vagy az adatok nem érhetők el.</p>`;
        }
