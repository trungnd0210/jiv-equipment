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
            const paTab = document.getElementById('pa-tab'); //add new 20240610
            const adminTab = document.getElementById('admin-tab'); //add new 20240610
            const borrowTabBtn = document.getElementById('borrow-tab-btn');
            const equipmentTabBtn = document.getElementById('equipment-tab-btn');
            const paTabBtn = document.getElementById('pa-tab-btn'); //add new 20240610
            const adminTabBtn = document.getElementById('admin-tab-btn'); //add new 20240610
            const borrowForm = document.getElementById('borrow-form');
            const passwordForm = document.getElementById('password-form');
            const adminPasswordForm = document.getElementById('admin-password-form'); //add new 20240610
            const equipmentForm = document.getElementById('equipment-form');
            const borrowList = document.getElementById('borrow-list');
            const borrowHistory = document.getElementById('borrow-history');
            const equipmentList = document.getElementById('equipment-list');
            const equipmentList_disable = document.getElementById('equipment-list pw-disable');
            const equipmentSelect = document.getElementById('equipment');
            const quantityContainer = document.getElementById('quantity-container');
            const quantityInput = document.getElementById('quantity');
            const returnRequests = document.getElementById('return-requests'); //add new 20240610
            const leaveForm = document.getElementById('leave-form'); //add new 20240610
            const overtimeForm = document.getElementById('overtime-form'); //add new 20240610
            const pw_disable = document.getElementById('pw-disable'); //add new 20240616
            const pw_enable = document.getElementById('pw-enable'); //add new 20240616

            const correctPassword = "jivdqa";

            // Function to clear previous Firebase listeners
            function clearFirebaseListeners() {
                db.ref('borrows').off();
                db.ref('equipment').off();
            }

            // Tab switching 20240610
            borrowTabBtn.addEventListener('click', () => {
                switchTab(borrowTab);
            });
            equipmentTabBtn.addEventListener('click', () => {
                switchTab(equipmentTab);
            });
            paTabBtn.addEventListener('click', () => {
                switchTab(paTab);
            });
            adminTabBtn.addEventListener('click', () => {
                switchTab(adminTab);
            });
            
            function switchTab(tab) {
                borrowTab.classList.remove('active');
                equipmentTab.classList.remove('active');
                paTab.classList.remove('active');
                adminTab.classList.remove('active');
                tab.classList.add('active');
            }
            // End Tab switching 

            passwordForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const password = document.getElementById('password').value;
                if (password === correctPassword) {
                    passwordForm.style.display = 'none';
                    equipmentForm.style.display = 'block';
                    pw_disable.style.display = 'none';
                    pw_enable.style.display = 'block';
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
                const department = document.getElementById('department').value;
                const pic = document.getElementById('pic').value;
                const serialNumber = document.getElementById('serial-number').value;
                const verificationDate = document.getElementById('verification-date').value;
                const cycle = document.getElementById('cycle').value;
        
                addEquipment(name, quantity, department, pic, serialNumber, verificationDate, cycle);
                equipmentForm.reset();
            });

            function borrowEquipment(name, equipment, borrowTime, quantity) {
                db.ref('equipment').orderByChild('name').equalTo(equipment).once('value', (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const equipmentKey = childSnapshot.key;
                        const equipmentData = childSnapshot.val();

                        if (equipmentData.quantity > 0) {
                            // Reduce equipment quantity by 1
                            db.ref('equipment-debug/' + equipmentKey).update({ quantity: equipmentData.quantity - 1 });

                            // Add borrow record
                            const newBorrowRef = db.ref('borrows').push();
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

            function addEquipment(name, quantity, department, pic, serialNumber, verificationDate, cycle) {
                const validDate = new Date(verificationDate);
                validDate.setMonth(validDate.getMonth() + parseInt(cycle));
        
                const newEquipmentRef = db.ref('equipment').push();
                newEquipmentRef.set({
                    name,
                    quantity,
                    department,
                    pic,
                    serialNumber,
                    verificationDate,
                    cycle,
                    validDate: validDate.toISOString().split('T')[0]
                }).then(() => {
                    loadData();
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
                  <button class="return btn btn-outline-danger" data-key="${key}">Return</button>
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
                            db.ref('equipment-debug/' + equipmentKey).update({ quantity: equipmentData.quantity + 1 });
                        });
                    });
                });

                borrowList.appendChild(borrowItem);
            }

            function displayEquipment(key, name, quantity, department, pic, serialNumber, verificationDate, cycle, validDate) {
                const equipmentItem = document.createElement('tr');
                equipmentItem.innerHTML = `
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${department}</td>
                    <td>${pic}</td>
                    <td>${serialNumber}</td>
                    <td>${verificationDate}</td>
                    <td>${cycle}</td>
                    <td>${validDate}</td>
                    <td><button type="button" class="btn btn-outline-dark editBtn" data-id=${key}>Edit</button>
                    <button type="button" class="btn btn-outline-danger deleteBtn" data-id=${key} style="margin-top: 4px;">Delete</button></td>
                `;
                equipmentList.appendChild(equipmentItem);
            }

            function displayEquipment_disable(key, name, quantity, department, pic, serialNumber, verificationDate, cycle, validDate) {
                const equipmentItem = document.createElement('tr');
                equipmentItem.innerHTML = `
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${department}</td>
                    <td>${pic}</td>
                    <td>${serialNumber}</td>
                    <td>${verificationDate}</td>
                    <td>${cycle}</td>
                    <td>${validDate}</td>
                `;
                equipmentList_disable.appendChild(equipmentItem);
            }


            // Add event listeners for edit and delete buttons 20240626
            document.querySelectorAll('.editBtn').forEach(button => {
                button.addEventListener('click', handleEdit);
            });
            document.querySelectorAll('.deleteBtn').forEach(button => {
                button.addEventListener('click', handleDelete);
            });

            // // Event delegation for edit and delete buttons 20240616
            // equipmentTable.addEventListener('click', (event) => {
            //     const target = event.target;
            //     const row = target.closest('tr');
            //     const key = row.getAttribute('data-key');

            //     if (target.classList.contains('editBtn')) {
            //         editEquipment(row, key);
            //     } else if (target.classList.contains('deleteBtn')) {
            //         deleteEquipment(key);
            //     }
            // });
            // //20240616
            // function editEquipment(row, key) {
            //     const name = row.children[0].textContent;
            //     const type = row.children[1].textContent;
                
            //     const newName = prompt('Edit Name:', name);
            //     const newType = prompt('Edit Type:', type);
                
            //     if (newName !== null && newName !== '' && newType !== null && newType !== '') {
            //         db.ref('equipment-debug/' + key).update({
            //             name: newName,
            //             type: newType
            //         }).then(() => {
            //             row.children[0].textContent = newName;
            //             row.children[1].textContent = newType;
            //             console.log(`Edited equipment: ${name} -> ${newName}, ${type} -> ${newType}`);
            //         }).catch((error) => {
            //             console.error('Error updating equipment: ', error);
            //         });
            //     }
            // }
            // //20240616
            // function deleteEquipment(key) {
            //     db.ref('equipment-debug/' + key).remove().then(() => {
            //         document.querySelector(`tr[data-key="${key}"]`).remove();
            //         console.log('Equipment deleted');
            //     }).catch((error) => {
            //         console.error('Error deleting equipment: ', error);
            //     });
            // }

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
                historyItem.classList.add('borrow-his-li'); 
                historyItem.innerHTML = `${name} - ${equipment} ${quantity ? '(Quantity: ' + quantity + ')' : ''} (Borrowed at: ${borrowTime}, Returned at: ${returnTime})`;

                if (borrowHistory.children.length >= 15) {
                    borrowHistory.removeChild(borrowHistory.lastChild);
                }

                borrowHistory.insertBefore(historyItem, borrowHistory.firstChild);
            }

            function loadData() {
                clearFirebaseListeners();

                db.ref('borrows').on('value', (snapshot) => {
                    borrowList.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const borrow = childSnapshot.val();
                        if (!borrow.returnTime) {
                            displayBorrow(key, borrow.name, borrow.equipment, borrow.borrowTime, borrow.quantity);
                        }
                    });
                });

                db.ref('borrows').orderByChild('key').limitToLast(15).on('value', (snapshot) => {
                    borrowHistory.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const borrow = childSnapshot.val();
                        if (borrow.returnTime) {
                            const historyItem = document.createElement('li');
                            historyItem.classList.add('borrow-his-li'); 
                            historyItem.innerHTML = `${borrow.name} - ${borrow.equipment} ${borrow.quantity ? '(Quantity: ' + borrow.quantity + ')' : ''} (Borrowed at: ${borrow.borrowTime}, Returned at: ${borrow.returnTime})`;
                            borrowHistory.insertBefore(historyItem, borrowHistory.firstChild);
                        }
                    });
                });

                db.ref('equipment').on('value', (snapshot) => {
                    equipmentList.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const equipment = childSnapshot.val();
                        displayEquipment(key, equipment.name, equipment.quantity, equipment.department, equipment.pic, equipment.serialNumber, equipment.verificationDate, equipment.cycle, equipment.validDate);
                        displayEquipment_disable(key, equipment.name, equipment.quantity, equipment.department, equipment.pic, equipment.serialNumber, equipment.verificationDate, equipment.cycle, equipment.validDate);
                    });
                    updateEquipmentSelect();
                });
            }

            // Handle leave form submission 20240610
            leaveForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('leave-name').value;
                const period = document.getElementById('leave-period').value;
                // const leaveTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
                const leaveTime = document.getElementById('leave-date').value;
                db.ref('leaves').push({
                    name: name,
                    period: period,
                    leaveTime: leaveTime
                });
                alert('Leave submitted successfully');
                leaveForm.reset();
            });

            // Handle overtime form submission
            overtimeForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('overtime-name').value;
                const date = document.getElementById('overtime-date').value || new Date().toISOString().split('T')[0];
                const ot_hour = document.getElementById('ot-hour').value;
                const meal_check = document.getElementById('meal-check').checked;
                db.ref('overtime').push({
                    name: name,
                    date: date,
                    ot_hour: ot_hour,
                    meal_check: meal_check
                });
                alert('Overtime submitted successfully');
                overtimeForm.reset();
            });

            loadData();
        });

            // Listen for return requests in the admin panel
    db.ref('returns').on('child_added', (snapshot) => {
        const data = snapshot.val();
        const li = document.createElement('li');
        li.textContent = `Name: ${data.name}, Equipment: ${data.equipment}, Borrowed at: ${data.borrowTime}`;
        const approveButton = document.createElement('button');
        approveButton.textContent = 'Approve';
        approveButton.addEventListener('click', () => {
            db.ref('borrowHistory/' + data.id).set(data);
            db.ref('returns/' + data.id).remove();
            li.remove();
        });
        const rejectButton = document.createElement('button');
        rejectButton.textContent = 'Reject';
        rejectButton.addEventListener('click', () => {
            db.ref('returns/' + data.id).remove();
            db.ref('currentBorrows/' + data.id).set(data);
            li.remove();
        });
        li.appendChild(approveButton);
        li.appendChild(rejectButton);
        returnRequests.appendChild(li);
    });

    // Password protection for admin tab 20240610
    adminPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = document.getElementById('admin-password').value;
        if (password === correctPassword) {
            adminPasswordForm.style.display = 'none';
            document.getElementById('admin-panel').style.display = 'block';
        } else {
            alert('Incorrect password');
        }
    });
    
    // Handle return requests
    borrowList.addEventListener('click', (event) => {
        if (event.target.classList.contains('return')) {
            const itemId = event.target.dataset.id;
            db.ref('returns/' + itemId).set({
                id: itemId,
                name: event.target.dataset.name,
                equipment: event.target.dataset.equipment,
                borrowTime: event.target.dataset.borrowTime,
            });
            event.target.parentElement.remove();
        }
    });

    // Handle return requests 20240626
    function handleDelete(event) {
        const equipmentId = event.target.dataset.id; // Giả sử id được lưu trong thuộc tính data-id của button
    
        // Hiển thị pop-up xác nhận
        if (confirm('Are you sure you want to delete this equipment?')) {
            const db = firebase.database();
            const equipmentRef = db.ref('equipment-debug/' + equipmentId);
    
            equipmentRef.remove().then(() => {
                alert('Equipment deleted successfully!');
                location.reload();
            }).catch(error => {
                console.error('Error deleting equipment: ', error);
            });
        }
    }
