function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchDictionary() {
    const word = document.getElementById('searchInput').value.trim();
    if (!word) {
        alert('Please enter a word to search.');
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; 
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(entry => {
                    const wordHeader = document.createElement('h2');
                    wordHeader.textContent = capitalizeFirstLetter(entry.word);
                    resultsDiv.appendChild(wordHeader);

                    entry.meanings.forEach(meaning => {
                        const partOfSpeech = document.createElement('p');
                        partOfSpeech.textContent = `Part of Speech: ${capitalizeFirstLetter(meaning.partOfSpeech)}`;
                        resultsDiv.appendChild(partOfSpeech);

                        meaning.definitions.forEach((definition, index) => {
                            const definitionItem = document.createElement('p');
                            definitionItem.textContent = `${index + 1}. ${capitalizeFirstLetter(definition.definition)}`;
                            resultsDiv.appendChild(definitionItem);

                            if (definition.example) {
                                const exampleItem = document.createElement('p');
                                exampleItem.textContent = `Example: ${capitalizeFirstLetter(definition.example)}`;
                                resultsDiv.appendChild(exampleItem);
                            }
                        });
                    });
                });
            } else {
                const notFoundMessage = document.createElement('p');
                notFoundMessage.textContent = `No definition found for "${word}"`;
                resultsDiv.appendChild(notFoundMessage);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Trigger searchDictionary function on input
document.getElementById('searchInput').addEventListener('input', function() {
    const searchInput = this.value.trim();
    if (searchInput === '') {
        // Clear the meaning field when search input is empty
        document.getElementById('results').innerHTML = '';
    } else {
        // Call the searchDictionary function when search input is not empty
        searchDictionary();
    }
});
