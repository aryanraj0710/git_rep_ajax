document.addEventListener('DOMContentLoaded', () => {

    const titleElement = document.getElementById('main-title');
    titleElement.textContent = 'Full Stack AJAX Demo';
    titleElement.style.color = '#c9302c';

    const fetchButton = document.getElementById('fetch-btn');
    const resultContainer = document.getElementById('result-container');

    fetchButton.addEventListener('click', () => {
        
        resultContainer.innerHTML = '<p class="loading">Loading...</p>';

        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost:3000/api/data', true);
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    
                    const xmlDoc = xhr.responseXML;
                    
                    const message = xmlDoc.getElementsByTagName('message')[0].textContent;
                    const status = xmlDoc.getElementsByTagName('status')[0].textContent;
                    const timestamp = xmlDoc.getElementsByTagName('timestamp')[0].textContent;

                    resultContainer.innerHTML = `
                        <h3>Data Received!</h3>
                        <p><strong>Message:</strong> ${message}</p>
                        <p><strong>Status:</strong> ${status}</p>
                        <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
                    `;
                } else {
                    console.error('Error fetching data:', xhr.statusText);
                    resultContainer.innerHTML = `
                        <p style="color: red;"><strong>Failed to fetch data.</strong></R>
                        <p style="color: red;">Is your backend server running?</p>
                    `;
                }
            }
        };
        
        xhr.onerror = () => {
             console.error('XHR Request failed');
             resultContainer.innerHTML = '<p style="color: red;">A network error occurred.</p>';
        };

        xhr.send();
    });

});