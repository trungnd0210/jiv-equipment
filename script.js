        // Thêm cấu hình Firebase của bạn
        var firebaseConfig = {
            apiKey: "AIzaSyCbTcF_73q3SclbbjYvfTut9g490HprlSE",
            authDomain: "dqa-equipment-control.firebaseapp.com",
            databaseURL: "https://dqa-equipment-control-default-rtdb.asia-southeast1.firebasedatabase.app/",
            projectId: "dqa-equipment-control",
            storageBucket: "dqa-equipment-control.appspot.com",
            messagingSenderId: "338763078745",
            appId: "1:338763078745:web:19f6bbfd3415bbb2652548"
        };
        // Khởi tạo Firebase
        firebase.initializeApp(firebaseConfig);

        document.addEventListener('DOMContentLoaded', () => {
            const db = firebase.database();
            const borrowTab = document.getElementById('borrow-tab');
            const equipmentTab = document.getElementById('equipment-tab');
            const borrowTabBtn = document.getElementById('borrow-tab-btn');
            const equipmentTabBtn = document.getElementById('equipment-tab-btn');
            const borrowForm = document.getElementById('borrow-form');
            const passwordForm = document.getElementById('password-form');
            const equipmentForm = document.getElementById('equipment-form');
            const borrowList = document.getElementById('borrow-list');
            const borrowHistory = document.getElementById('borrow-history');
            const equipmentList = document.getElementById('equipment-list');
            const equipmentSelect = document.getElementById('equipment');
            const quantityContainer = document.getElementById('quantity-container');
            const quantityInput = document.getElementById('quantity');

            const correctPassword = "jivdqa2024";

            // Function to clear previous Firebase listeners
            function clearFirebaseListeners() {
                db.ref('debug').off();
                db.ref('equipment').off();
            }

            // Switch between tabs
            borrowTabBtn.addEventListener('click', () => {
                borrowTab.classList.add('active');
                equipmentTab.classList.remove('active');
            });

            equipmentTabBtn.addEventListener('click', () => {
                borrowTab.classList.remove('active');
                if (equipmentForm.style.display === 'block') {
                    equipmentTab.classList.add('active');
                } else {
                    passwordForm.style.display = 'block';
                    equipmentForm.style.display = 'none';
                    equipmentTab.classList.add('active');
                }
            });

            passwordForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const password = document.getElementById('password').value;
                if (password === correctPassword) {
                    passwordForm.style.display = 'none';
                    equipmentForm.style.display = 'block';
                } else {
                    alert('Incorrect password');
                }
            });

            equipmentSelect.addEventListener('change', () => {
                if (equipmentSelect.value === 'rechargeable-battery') {
                    quantityContainer.style.display = 'block';
                    quantityInput.required = true;
                } else {
                    quantityContainer.style.display = 'none';
                    quantityInput.required = false;
                }
            });

            borrowForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const equipment = document.getElementById('equipment').value;
                const borrowTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
                let quantity = null;

                if (equipment === 'rechargeable-battery') {
                    quantity = document.getElementById('quantity').value;
                }

                borrowEquipment(name, equipment, borrowTime, quantity);
                borrowForm.reset();
                quantityContainer.style.display = 'none';
            });

            equipmentForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('new-equipment-name').value;
                const quantity = document.getElementById('new-equipment-quantity').value;
                addEquipment(name, quantity);
                equipmentForm.reset();
            });

            function borrowEquipment(name, equipment, borrowTime, quantity) {
                db.ref('equipment').orderByChild('name').equalTo(equipment).once('value', (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const equipmentKey = childSnapshot.key;
                        const equipmentData = childSnapshot.val();

                        if (equipmentData.quantity > 0) {
                            // Reduce equipment quantity by 1
                            db.ref('equipment/' + equipmentKey).update({ quantity: equipmentData.quantity - 1 });

                            // Add borrow record
                            const newBorrowRef = db.ref('debug').push();
                            const borrowData = { name, equipment, borrowTime };
                            if (quantity) {
                                borrowData.quantity = quantity;
                            }
                            newBorrowRef.set(borrowData).then(() => {
                                loadData(); // Refresh the data after updating
                            }).catch((error) => {
                                console.error("Error adding borrow: ", error);
                            });
                        } else {
                            alert('This equipment is out of stock.');
                        }
                    });
                });
            }

            function addEquipment(name, quantity) {
                const newEquipmentRef = db.ref('equipment').push();
                newEquipmentRef.set({ name, quantity }).then(() => {
                    loadData(); // Refresh the data after updating
                }).catch((error) => {
                    console.error("Error adding equipment: ", error);
                });
            }

            function displayBorrow(key, name, equipment, borrowTime, quantity) {
                const borrowItem = document.createElement('div');
                // borrowItem.innerHTML = `${name} - ${equipment} ${quantity ? '(Quantity: ' + quantity + ')' : ''} (Borrowed at: ${borrowTime}) <button class="return" data-key="${key}">Return</button>`;
                borrowItem.classList.add('card', 'borrow-item'); 
                borrowItem.innerHTML = `
                <div class="card-body">
                  <p class="card-text">${name} - ${equipment} ${quantity ? '(Quantity: ' + quantity + ')' : ''} (Borrowed at: ${borrowTime})</p>
                  <button class="return" data-key="${key}">Return</button>
                </div>`;

                borrowItem.querySelector('.return').addEventListener('click', () => {
                    const returnTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
                    db.ref('debug/' + key).update({ returnTime: returnTime }).then(() => {
                        loadData(); // Refresh the data after updating
                    }).catch((error) => {
                        console.error("Error returning borrow: ", error);
                    });

                    // Increase equipment quantity by 1 when returned
                    db.ref('equipment').orderByChild('name').equalTo(equipment).once('value', (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            const equipmentKey = childSnapshot.key;
                            const equipmentData = childSnapshot.val();
                            db.ref('equipment/' + equipmentKey).update({ quantity: equipmentData.quantity + 1 });
                        });
                    });
                });

                borrowList.appendChild(borrowItem);
            }

            function displayEquipment(key, name, quantity) {
                const equipmentItem = document.createElement('li');
                equipmentItem.innerHTML = `${name} - Quantity: ${quantity}`;
                equipmentList.appendChild(equipmentItem);
            }

            function updateEquipmentSelect() {
                db.ref('equipment').once('value', (snapshot) => {
                    equipmentSelect.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const equipment = childSnapshot.val();
                        if (equipment.quantity > 0) {
                            const option = document.createElement('option');
                            option.value = equipment.name;
                            option.innerHTML = `${equipment.name} (${equipment.quantity})`;
                            equipmentSelect.appendChild(option);
                        }
                    });
                });
            }

            function addToBorrowHistory(name, equipment, borrowTime, returnTime, quantity) {
                const historyItem = document.createElement('li');
                historyItem.innerHTML = `${name} - ${equipment} ${quantity ? '(Quantity: ' + quantity + ')' : ''} (Borrowed at: ${borrowTime}, Returned at: ${returnTime})`;

                if (borrowHistory.children.length >= 15) {
                    borrowHistory.removeChild(borrowHistory.lastChild);
                }

                borrowHistory.insertBefore(historyItem, borrowHistory.firstChild);
            }

            function loadData() {
                clearFirebaseListeners();

                db.ref('debug').on('value', (snapshot) => {
                    borrowList.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const borrow = childSnapshot.val();
                        if (!borrow.returnTime) {
                            displayBorrow(key, borrow.name, borrow.equipment, borrow.borrowTime, borrow.quantity);
                        }
                    });
                });

                db.ref('debug').orderByChild('key').limitToLast(15).on('value', (snapshot) => {
                    borrowHistory.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const borrow = childSnapshot.val();
                        if (borrow.returnTime) {
                            const historyItem = document.createElement('li');
                            historyItem.innerHTML = `${borrow.name} - ${borrow.equipment} ${borrow.quantity ? '(Quantity: ' + borrow.quantity + ')' : ''} (Borrowed at: ${borrow.borrowTime}, Returned at: ${borrow.returnTime})`;
                            borrowHistory.insertBefore(historyItem, borrowHistory.firstChild);
                        }
                    });
                });

                db.ref('equipment').on('value', (snapshot) => {
                    equipmentList.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const equipment = childSnapshot.val();
                        displayEquipment(childSnapshot.key, equipment.name, equipment.quantity);
                    });
                    updateEquipmentSelect();
                });
            }

            loadData();
        });