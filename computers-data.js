// Fetch and render computers from JSON
fetch('computers.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('computers-list');
        if (!container) return;

        container.innerHTML = '';
        
        data.computers.forEach(computer => {
            const computerDiv = document.createElement('div');
            computerDiv.className = 'computer-item';
            computerDiv.innerHTML = `
                <h3>${computer.name}</h3>
                <p><strong>Purpose:</strong> ${computer.description}</p>
                
                <h4>Specs</h4>
                <ul>
                    <li><strong>CPU:</strong> ${computer.specs.cpu}</li>
                    <li><strong>RAM:</strong> ${computer.specs.ram}</li>
                    <li><strong>Storage:</strong> ${computer.specs.storage}</li>
                    ${computer.specs.GPU ? `<li><strong>GPU:</strong> ${computer.specs.GPU}</li>` : ''}
                    <li><strong>OS:</strong> ${computer.specs.os}</li>
                </ul>
                
                ${computer.peripherals ? `
                <h4>Peripherals</h4>
                <ul>
                    <li><strong>Keyboard:</strong> ${computer.peripherals.keyboard}</li>
                    <li><strong>Monitor:</strong> ${computer.peripherals.monitor}</li>
                    <li><strong>Other:</strong> ${computer.peripherals.other}</li>
                </ul>
                ` : ''}
                
                <p><strong>Notes:</strong> ${computer.notes}</p>
            `;
            container.appendChild(computerDiv);
        });
    })
    .catch(error => console.error('Error loading computers:', error));
