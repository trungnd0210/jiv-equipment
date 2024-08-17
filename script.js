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
            const dashboardTab = document.getElementById('dashboard-tab');
            const equipmentTab = document.getElementById('equipment-tab');
            const paTab = document.getElementById('pa-tab'); //add new 20240610
            const adminTab = document.getElementById('admin-tab'); //add new 20240610
            const dashboardTabBtn = document.getElementById('dashboard-tab-btn'); //add new 20240713
            const borrowTabBtn = document.getElementById('borrow-tab-btn');
            const equipmentTabBtn = document.getElementById('equipment-tab-btn');
            const paTabBtn = document.getElementById('pa-tab-btn'); //add new 20240610
            const adminTabBtn = document.getElementById('admin-tab-btn'); //add new 20240610
            const borrowForm = document.getElementById('borrow-form');
            const passwordForm = document.getElementById('password-form');
            const adminPasswordForm = document.getElementById('admin-password-form'); //add new 20240610
            const equipmentForm = document.getElementById('equipment-form');
            const borrowList = document.getElementById('borrow-list');
            const borrowList_disable = document.getElementById('borrow-list pw-disable');
            const borrowHistory = document.getElementById('borrow-history');
            const equipmentList = document.getElementById('equipment-list');
            const equipmentList_disable = document.getElementById('equipment-list pw-disable');
            const equipmentSelect = document.getElementById('equipment');
            const quantityContainer = document.getElementById('quantity-container');
            const quantityInput = document.getElementById('quantity');
            const returnRequests = document.getElementById('return-requests'); //add new 20240610
            const leaveForm = document.getElementById('leave-form'); //add new 20240610
            const memberForm = document.getElementById('member-form'); //add new 20240713
            const overtimeForm = document.getElementById('overtime-form'); //add new 20240610
            // const pw_disable = document.getElementById('pw-disable'); //add new 20240616
            // const pw_enable = document.getElementById('pw-enable'); //add new 20240616
            const pwEnableElements = document.querySelectorAll('#pw-enable'); //add new 20240712
            const pwDisableElements = document.querySelectorAll('#pw-disable'); //add new 20240712
            // Dashboard-pick-date
            const dateForm = document.getElementById('date-form');
            const datePicker = document.getElementById('date-picker');
            const dbType = document.getElementById('db-type');
            //Admin
            const memberList = document.getElementById('member-list');
            //Machine form tab - add new 20240722
            const machineTab = document.getElementById('machine-tab');
            const machineTabBtn = document.getElementById('machine-tab-btn');
            const machineForm = document.getElementById('machine-form');
            const machineList = document.getElementById('machine-list');
            const machineList_disable = document.getElementById('machine-list pw-disable');

            //Component form tab - add new 20240722
            const comTab = document.getElementById('component-tab');
            const comTabBtn = document.getElementById('component-tab-btn');
            const comForm = document.getElementById('component-form');
            const comList = document.getElementById('component-list');
            const comList_disable = document.getElementById('component-list pw-disable');
            const mcUsingSelect = document.getElementById('mc-using');
            const mcEditUsingSelect = document.getElementById('edit-mc-using');

            //DQA - bug control tab - 20240727
            const dqaJobListTabBtn = document.getElementById('job-list-btn');
            const jobListTab = document.getElementById('job-list-tab');

            //Pw admin
            const correctPassword = "6991";
            const dccPassword = "dcc4202";

            // Function to clear previous Firebase listeners
            function clearFirebaseListeners() {
                db.ref('borrows').off();
                db.ref('equipment').off();
            }

            // Tab switching 20240610
            const container = document.querySelector('.container');
            dashboardTabBtn.addEventListener('click', () => {
                switchTab(dashboardTab);
                container.classList.remove('container-wide');
            });
            borrowTabBtn.addEventListener('click', () => {
                switchTab(borrowTab);
                container.classList.remove('container-wide');
            });
            equipmentTabBtn.addEventListener('click', () => {
                switchTab(equipmentTab);
                container.classList.remove('container-wide');
            });
            machineTabBtn.addEventListener('click', () => {
                switchTab(machineTab);
                container.classList.remove('container-wide');
            });
            comTabBtn.addEventListener('click', () => {
                switchTab(comTab);
                container.classList.remove('container-wide');
            });
            dqaJobListTabBtn.addEventListener('click', () => {
                switchTab(jobListTab);
                container.classList.add('container-wide');
            })
            paTabBtn.addEventListener('click', () => {
                switchTab(paTab);
                container.classList.remove('container-wide');
            });
            adminTabBtn.addEventListener('click', () => {
                switchTab(adminTab);
                container.classList.remove('container-wide');
            });
            
            function switchTab(tab) {
                borrowTab.classList.remove('active');
                equipmentTab.classList.remove('active');
                machineTab.classList.remove('active');
                comTab.classList.remove('active');
                jobListTab.classList.remove('active');
                paTab.classList.remove('active');
                adminTab.classList.remove('active');
                dashboardTab.classList.remove('active');
                tab.classList.add('active');
            }
            // End Tab switching 

            passwordForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const password = document.getElementById('password').value;
                if (password === correctPassword) {
                    passwordForm.style.display = 'none';
                    equipmentForm.style.display = 'block';
                    machineForm.style.display = 'block';
                    comForm.style.display = 'block';
                    memberForm.style.display = 'block';
                    pwEnableElements.forEach(element => {
                        element.style.display = '';
                        // element.style.display = 'block';
                      });
                    pwDisableElements.forEach(element => {
                        element.style.display = 'none';
                    });
                } else if (password === dccPassword) {
                    passwordForm.style.display = 'none';
                    equipmentForm.style.display = 'block';
                    machineForm.style.display = 'block';
                    comForm.style.display = 'block';
                    memberForm.style.display = 'block';
                    pwEnableElements.forEach(element => {
                        element.style.display = '';
                        // element.style.display = 'block';
                      });
                    pwDisableElements.forEach(element => {
                        element.style.display = 'none';
                    });
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

            // Add new machine 20240722
            machineForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('new-machine-name').value;
                const quantity = document.getElementById('new-machine-quantity').value;
                const description = document.getElementById('mc-description').value;
                const machineSerial = document.getElementById('mc-serial').value;
                const verificationDate = document.getElementById('mc-date').value;
                const mcLocation = document.getElementById('mc-location').value;
                const mcPIC = document.getElementById('mc-pic').value;
                const mcType = document.getElementById('mc-type').value;
                const mcStore = "0057";
                addMachine(name, quantity, description, machineSerial, verificationDate, mcLocation, mcPIC, mcType, mcStore);
                machineForm.reset();
            });

            function addMachine(name, quantity, description, machineSerial, verificationDate, mcLocation, mcPIC, mcType, mcStore) {
        
                const newMachineRef = db.ref('machines').push();
                newMachineRef.set({
                    name,
                    quantity,
                    description,
                    machineSerial,
                    verificationDate,
                    mcLocation,
                    mcPIC,
                    mcType,
                    verificationDate,
                    mcStore
                }).then(() => {
                    alert('Machine submitted successfully');
                    updateMachineUsingSelect();
                    loadData();
                }).catch((error) => {
                    console.error("Error adding equipment: ", error);
                });
            }

            //Display machine function 20240722
            db.ref('machines').on('value', (snapshot) => {
                machineList.innerHTML = '';
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    const machine = childSnapshot.val();
                    displayMachine(key, machine.description, machine.machineSerial, machine.mcLocation, machine.mcPIC, machine.mcType, machine.name,
                         machine.quantity, machine.verificationDate, machine.mcStore);
                    displayMachine_disable(key, machine.description, machine.machineSerial, machine.mcLocation, machine.mcPIC, machine.mcType, machine.name,
                        machine.quantity, machine.verificationDate, machine.mcStore);
                });
            });
            
            function displayMachine(key, des, serial, location, pic, type, name, quantity, date, store) {
                const machineItem = document.createElement('tr');
                machineItem.innerHTML = `
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${serial}</td>
                    <td>${date}</td>
                    <td>${location}</td>
                    <td>${pic}</td>
                    <td>${type}</td>
                    <td>${des}</td>
                    <td>${store}</td>
                    <td>
                        <button type="button" class="btn btn-outline-dark editBtn" data-toggle="modal" data-target="#modalEditMc" data-id=${key}>
                            <i class="fi fi-rr-edit"></i>
                        </button>
                    </td>
                `;
                // <td style="width: 116px;">
                // <button type="button" class="btn btn-outline-warning switchBtn" data-id=${key}>
                // <i class="fi fi-rr-replace"></i>
                // </button>
                machineList.appendChild(machineItem);
            }

            function displayMachine_disable(key, des, serial, location, pic, type, name, quantity, date, store) {
                const machineItem = document.createElement('tr');
                machineItem.innerHTML = `
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${serial}</td>
                    <td>${date}</td>
                    <td>${location}</td>
                    <td>${pic}</td>
                    <td>${type}</td>
                    <td>${des}</td>
                    <td>${store}</td>
                `;
                machineList_disable.appendChild(machineItem);
            }

            // Edit machine func 20240723
            let mckey = "";
            let oldMachineName = ""; // Variable to store old machine name

            document.addEventListener('click', function(event) {
                const target = event.target;
                if (target.matches('.editBtn') || target.matches('.editBtn i')) {
                    const key = target.dataset.id || target.parentElement.dataset.id; // Get the data-id from the node itself or parent node
                    mckey = key;
                    db.ref(`machines/${key}`).once('value', (snapshot) => {
                        const machine = snapshot.val();
                        document.getElementById('edit-machine-name').value = machine.name;
                        document.getElementById('edit-machine-quantity').value = machine.quantity;
                        document.getElementById('edit-mc-serial').value = machine.machineSerial;
                        document.getElementById('edit-mc-date').value = machine.verificationDate;
                        document.getElementById('edit-mc-location').value = machine.mcLocation;
                        document.getElementById('edit-mc-pic').value = machine.mcPIC;
                        document.getElementById('edit-mc-description').value = machine.description;
                        document.getElementById('edit-mc-type').value = machine.mcType;
                        document.getElementById('edit-mc-store').value = machine.mcStore;
                        oldMachineName = machine.name; // Store the old machine name
                    });
                }
            });

            document.getElementById('edit-mc-form').addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default submission

                const newMachineName = document.getElementById('edit-machine-name').value;

                const updatedMachine = {
                    name: newMachineName,
                    quantity: document.getElementById('edit-machine-quantity').value,
                    machineSerial: document.getElementById('edit-mc-serial').value,
                    verificationDate: document.getElementById('edit-mc-date').value,
                    mcLocation: document.getElementById('edit-mc-location').value,
                    mcPIC: document.getElementById('edit-mc-pic').value,
                    description: document.getElementById('edit-mc-description').value,
                    mcType: document.getElementById('edit-mc-type').value,
                    mcStore: document.getElementById('edit-mc-store').value
                };

                db.ref(`machines/${mckey}`).update(updatedMachine)
                    .then(() => {
                        alert('Update successfully! Thành công!');
                        // Close the model editing form
                        $('#modalEditMc').modal('hide');

                        // Check if machine name has changed
                        if (newMachineName !== oldMachineName) {
                            // Update components where mcUsing is oldMachineName
                            db.ref('components').orderByChild('mcUsing').equalTo(oldMachineName).once('value', (snapshot) => {
                                snapshot.forEach(childSnapshot => {
                                    const componentKey = childSnapshot.key;
                                    db.ref(`components/${componentKey}`).update({ mcUsing: newMachineName })
                                        .then(() => {
                                            console.log(`Component ${componentKey} updated with new machine name`);
                                        })
                                        .catch(error => {
                                            console.error("Error updating component: ", error);
                                        });
                                });
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error while updating: ", error);
                    });
            });
            
            // Add new component 20240722
            comForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('new-component-name').value;
                const sapCode = document.getElementById('component-code').value;
                const quantity = document.getElementById('new-component-quantity').value;
                const docNo = document.getElementById('component-doc-no').value;
                const description = document.getElementById('com-description').value;
                const mcUsing= document.getElementById('mc-using').value;
                const date= document.getElementById('com-date').value;
                addComponent(name, sapCode, quantity, docNo, description, mcUsing, date);
                comForm.reset();
            });

            function addComponent(name, sapCode, quantity, docNo, description, mcUsing, date) {
        
                const newComRef = db.ref('components').push();
                newComRef.set({
                    name,
                    sapCode,
                    quantity,
                    description,
                    docNo,
                    mcUsing,
                    date,
                }).then(() => {
                    alert('Component submitted successfully');
                    loadData();
                }).catch((error) => {
                    console.error("Error adding equipment: ", error);
                });
            }

            //Display component function 20240722
            db.ref('components').on('value', (snapshot) => {
                comList.innerHTML = '';
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    const component = childSnapshot.val();
                    displayComponent(key, component.description, component.mcUsing, component.name, component.quantity, component.sapCode, component.docNo, component.date);
                    displayComponent_disable(key, component.description, component.mcUsing, component.name, component.quantity, component.sapCode, component.docNo, component.date);
                });
                updateMachineUsingSelect();
            });
            
            function displayComponent(key, des, mcUsing, name, quantity, sapCode, docNo, date) {
                const comItem = document.createElement('tr');
                comItem.innerHTML = `
                    <td>${name}</td>
                    <td>${sapCode}</td>
                    <td>${quantity}</td>
                    <td>${des}</td>
                    <td>${mcUsing}</td>
                    <td>${docNo}</td>
                    <td>${date}</td>
                    <td>
                    <button type="button" class="btn btn-outline-dark editBtn" data-toggle="modal" data-target="#modalEditCom" data-id=${key}>
                        <i class="fi fi-rr-edit"></i>
                    </button>
                </td>
                `;
                comList.appendChild(comItem);
            }

            function displayComponent_disable(key, des, mcUsing, name, quantity, sapCode, docNo, date) {
                const comItem = document.createElement('tr');
                comItem.innerHTML = `
                    <td>${name}</td>
                    <td>${sapCode}</td>
                    <td>${quantity}</td>
                    <td>${des}</td>
                    <td>${mcUsing}</td>
                    <td>${docNo}</td>
                    <td>${date}</td>
                `;
                comList_disable.appendChild(comItem);
            }

            function updateMachineUsingSelect() {
                db.ref('machines').once('value', (snapshot) => {
                    mcUsingSelect.innerHTML = '';
                    mcEditUsingSelect.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const machine = childSnapshot.val();
                        if (machine.mcType === "mc-rd" && machine.quantity > 0) {
                            const option = document.createElement('option');
                            option.value = machine.name;
                            option.innerHTML = `${machine.name} [${machine.quantity}]`;
                            mcUsingSelect.appendChild(option);
                        }
                    });
                    snapshot.forEach((childSnapshot) => {
                        const machine = childSnapshot.val();
                        if (machine.mcType === "mc-rd" && machine.quantity > 0) {
                            const option = document.createElement('option');
                            option.value = machine.name;
                            option.innerHTML = `${machine.name} [${machine.quantity}]`;
                            mcEditUsingSelect.appendChild(option);
                        }
                    });
                });
            }

            //Edit component func 20240724
            let comkey = "";
            document.addEventListener('click', function (event) {
                const target = event.target;
                if (target.matches('.editBtn') || target.matches('.editBtn i')) {
                    const key = target.dataset.id || target.parentElement.dataset.id; // Get the data-id from the node itself or parent node
                    comkey = key;
                    db.ref(`components/${key}`).once('value', (snapshot) => {
                        const component = snapshot.val();
                        updateMachineUsingSelect();
                        document.getElementById('edit-com-name').value = component.name;
                        document.getElementById('edit-component-code').value = component.sapCode;
                        document.getElementById('edit-com-quantity').value = component.quantity;
                        document.getElementById('edit-mc-using').value = component.mcUsing;
                        document.getElementById('edit-component-doc-no').value = component.docNo;
                        document.getElementById('edit-com-description').value = component.description;
                        document.getElementById('edit-com-date').value = component.date;
                    });
                }
            });
            
            document.getElementById('edit-com-form').addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default submission
            
                const updatedCom = {
                    name: document.getElementById('edit-com-name').value,
                    sapCode: document.getElementById('edit-component-code').value,
                    quantity: document.getElementById('edit-com-quantity').value,
                    mcUsing: document.getElementById('edit-mc-using').value,
                    docNo: document.getElementById('edit-component-doc-no').value,
                    description: document.getElementById('edit-com-description').value,
                    date: document.getElementById('edit-com-date').value,
                };
            
                db.ref(`components/${comkey}`).update(updatedCom)
                    .then(() => {
                        alert('Update successfully! Thành công!');
                        // Close the model editing form
                        $('#modalEditCom').modal('hide');
                    })
                    .catch(error => {
                        console.error("Error while updating: ", error);
                    });
            });

            //Search component function 20240724
            const searchBox = document.getElementById('searchBox');
            function searchComponents(query) {
                db.ref('components').once('value', (snapshot) => {
                    comList.innerHTML = '';
                    comList_disable.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const component = childSnapshot.val();
                        if (component.name.toLowerCase().includes(query.toLowerCase()) || component.mcUsing.toLowerCase().includes(query.toLowerCase()) || 
                            component.description.toLowerCase().includes(query.toLowerCase()) || 
                            component.sapCode.toLowerCase().includes(query.toLowerCase())) {
                            displayComponent(key, component.description, component.mcUsing, component.name, component.quantity, component.sapCode, component.docNo, component.date);
                            displayComponent_disable(key, component.description, component.mcUsing, component.name, component.quantity, component.sapCode, component.docNo, component.date);
                        }
                    });
                    updateMachineUsingSelect();
                });
            }
    
            searchBox.addEventListener('input', (event) => {
                const query = event.target.value;
                searchComponents(query);
            });
    
            // Tải danh sách ban đầu khi không có từ khóa tìm kiếm
            searchComponents('');

            /////////////////////////////////////////
            function borrowEquipment(name, equipment, borrowTime, quantity) {
                db.ref('equipment').orderByChild('name').equalTo(equipment).once('value', (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const equipmentKey = childSnapshot.key;
                        const equipmentData = childSnapshot.val();

                        if (equipmentData.quantity > 0) {
                            // Reduce equipment quantity by 1
                            db.ref('equipment/' + equipmentKey).update({ quantity: equipmentData.quantity - 1 });

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
                borrowItem.classList.add('card', 'borrow-item'); 
                borrowItem.innerHTML = `
                <div class="card-body">
                  <p class="card-text">${name} - ${equipment} ${quantity ? '(Quantity: ' + quantity + ')' : ''} (Borrowed at: ${borrowTime})</p>
                  <button class="return btn btn-outline-danger" data-key="${key}">Return</button>
                </div>`;

                borrowItem.querySelector('.return').addEventListener('click', () => {
                    const returnTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
                    db.ref('borrows/' + key).update({ returnTime: returnTime }).then(() => {
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

            function displayBorrow_disable(key, name, equipment, borrowTime, quantity) {
                const borrowItem_disable = document.createElement('div');
                borrowItem_disable.classList.add('card', 'borrow-item'); 
                borrowItem_disable.innerHTML = `
                <div class="card-body">
                  <p class="card-text">${name} - ${equipment} ${quantity ? '(Quantity: ' + quantity + ')' : ''} (Borrowed at: ${borrowTime})</p>
                </div>`;

                borrowList_disable.appendChild(borrowItem_disable);
            }

            // Display equipment function
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
                    <td>
                        <button type="button" class="btn btn-outline-dark editBtn" data-toggle="modal" data-target="#modalEditEquip" data-id=${key}>
                            <i class="fi fi-rr-edit"></i>
                        </button>
                    </td>
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

            //Edit equipment func 20240724
            let equipkey = "";
            document.addEventListener('click', function (event) {
                const target = event.target;
                if (target.matches('.editBtn') || target.matches('.editBtn i')) {
                    const key = target.dataset.id || target.parentElement.dataset.id; // Get the data-id from the node itself or parent node
                    equipkey = key;
                    db.ref(`equipment/${key}`).once('value', (snapshot) => {
                        const equip = snapshot.val();
                        updateMachineUsingSelect();
                        document.getElementById('edit-equipment-name').value = equip.name;
                        document.getElementById('edit-equipment-quantity').value = equip.quantity;
                        document.getElementById('edit-equip-department').value = equip.department;
                        document.getElementById('edit-serial-number').value = equip.serialNumber;
                        document.getElementById('edit-verification-date').value = equip.verificationDate;
                        document.getElementById('edit-cycle').value = equip.cycle;
                        document.getElementById('edit-pic').value = equip.pic;
                    });
                }
            });
            
            document.getElementById('edit-equip-form').addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default submission
            
                const updatedEquip = {
                    name: document.getElementById('edit-equipment-name').value,
                    quantity: document.getElementById('edit-equipment-quantity').value,
                    department: document.getElementById('edit-equip-department').value,
                    serialNumber: document.getElementById('edit-serial-number').value,
                    verificationDate: document.getElementById('edit-verification-date').value,
                    cycle: document.getElementById('edit-cycle').value,
                    pic: document.getElementById('edit-pic').value,
                };
            
                db.ref(`equipment/${equipkey}`).update(updatedEquip)
                    .then(() => {
                        alert('Update successfully! Thành công!');
                        // Close the model editing form
                        $('#modalEditEquip').modal('hide');
                    })
                    .catch(error => {
                        console.error("Error while updating: ", error);
                    });
            });

            // Add event listeners for edit and delete buttons 20240626
            document.querySelectorAll('.editBtn').forEach(button => {
                button.addEventListener('click', handleEdit);
            });
            document.querySelectorAll('.deleteBtn').forEach(button => {
                button.addEventListener('click', handleDelete);
            });

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
                    borrowList_disable.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const borrow = childSnapshot.val();
                        if (!borrow.returnTime) {
                            displayBorrow(key, borrow.name, borrow.equipment, borrow.borrowTime, borrow.quantity);
                            displayBorrow_disable(key, borrow.name, borrow.equipment, borrow.borrowTime, borrow.quantity);
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

                db.ref('member').on('value', (snapshot) => {
                    memberList.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const member = childSnapshot.val();
                        displayMember(key, member.emp_department, member.eng_name, member.name, member.grade, member.hire_date, member.id, member.mail, member.phone);
                    });
                    updateEquipmentSelect();
                });
            }

            // Form submit leave #update 20240715 add more check name based on memberId
            const leavePeriod = document.getElementById('leave-period');
            const additionalFields = document.getElementById('additional-fields');

            leavePeriod.addEventListener('change', () => {
                const selectedPeriod = leavePeriod.value;
                additionalFields.innerHTML = '';

                if (selectedPeriod === 'several_day') {
                    additionalFields.innerHTML = `
                        <div class="form-group col-md-4">
                            <label for="leave-end-date">End Date (Ngày kết thúc-结束日期):</label>
                            <input type="date" id="leave-end-date" class="form-control" required>
                        </div>
                    `;
                } else if (selectedPeriod === 'personal') {
                    additionalFields.innerHTML = `
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="leave-start-time">Start Time (Thời gian bắt đầu-开始时间):</label>
                            <input type="time" id="leave-start-time" class="form-control" required>
                        </div>
                        <div class="form-group col-md-4">
                        <label for="leave-end-time">End Time (Thời gian kết thúc-结束时间):</label>
                        <input type="time" id="leave-end-time" class="form-control" required>
                    </div>
                    </div>    
                    `;
                }
            });

            leaveForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const leaveId = document.getElementById('leave-id').value;
                const leavePeriod = document.getElementById('leave-period').value;
                const leaveTime = document.getElementById('leave-date').value;
        
                if (leaveId && leavePeriod && leaveTime) {
                    let leaveData = {
                        memberId: leaveId,
                        period: leavePeriod,
                        leaveTime: leaveTime
                    };
        
                    if (leavePeriod === 'several_day') {
                        const endDate = document.getElementById('leave-end-date').value;
                        const start = new Date(leaveTime);
                        const end = new Date(endDate);
                        let current = start;
        
                        let leaveEntries = [];
                        while (current <= end) {
                            const dateString = current.toISOString().split('T')[0];
                            leaveEntries.push({ ...leaveData, leaveTime: dateString, period: 'all' });
                            current.setDate(current.getDate() + 1);
                        }
        
                        submitLeave(leaveEntries, true);
                    } else if (leavePeriod === 'personal') {
                        const startTime = document.getElementById('leave-start-time').value;
                        const endTime = document.getElementById('leave-end-time').value;
                        leaveData.startTime = startTime;
                        leaveData.endTime = endTime;
        
                        submitLeave([leaveData]);
                    } else {
                        submitLeave([leaveData]);
                    }
                } else {
                    alert('Please fill in all fields');
                }
            });
        
            function submitLeave(leaveDataArray, isMultiple = false) {
                const memberId = leaveDataArray[0].memberId;
        
                db.ref('member').orderByChild('id').equalTo(memberId).once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        let leaveCount = leaveDataArray.length;
                        snapshot.forEach((childSnapshot) => {
                            const memberData = childSnapshot.val();
                            leaveDataArray.forEach(leaveData => {
                                leaveData.name = memberData.name;
        
                                db.ref('leaves').push(leaveData).then(() => {
                                    leaveCount--;
                                    if (leaveCount === 0) {
                                        alert('Leave submitted successfully');
                                    }
                                }).catch((error) => {
                                    console.error('Error submitting leave: ', error);
                                });
                            });
                        });
                    } else {
                        alert('Member ID not found');
                        console.error('Member ID not found');
                    }
                });
            }

            // Form submit overtime #update 20240715 add more check name based on memberId
            overtimeForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const id = document.getElementById('overtime-id').value;
                const date = document.getElementById('overtime-date').value || new Date().toISOString().split('T')[0];
                const ot_hour = document.getElementById('ot-hour').value;
                const ot_reason = document.getElementById('overtime-reason').value;
                const meal_check = document.getElementById('meal-check').checked;

                if (id && date && ot_hour) {
                const overtimeData = {
                    memberId: id,
                    date: date,
                    ot_hour: ot_hour,
                    ot_reason: ot_reason,
                    meal_check: meal_check
                };
                submitOvertime(overtimeData);
                } else {
                alert('Please fill in all fields');
                }
            });

            function submitOvertime(overtimeData) {
                const memberId = overtimeData.memberId;
            
                db.ref('member').orderByChild('id').equalTo(memberId).once('value', (snapshot) => {
                  if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                      const memberData = childSnapshot.val();
                      overtimeData.name = memberData.name;
            
                      db.ref('overtime').push(overtimeData).then(() => {
                        alert('Overtime submitted successfully');
                      }).catch((error) => {
                        console.error('Error submitting overtime: ', error);
                      });
                    });
                  } else {
                    console.error('Member ID not found');
                    alert('Member ID not found');
                  }
                });
            }

            //Handle add new member form submission 20240713
            memberForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('employee-name').value;
                const eng_name = document.getElementById('eng-name').value;
                const id = document.getElementById('employee-id').value;
                const hire_date = document.getElementById('hire-date').value;
                const emp_department = document.getElementById('employee-department').value;
                const mail = document.getElementById('mail').value;
                const phone = document.getElementById('employee-phone').value;
                const grade = document.getElementById('grade').value;
                db.ref('member').push({
                    name: name,
                    eng_name: eng_name,
                    id: id,
                    hire_date: hire_date,
                    emp_department: emp_department,
                    mail: mail,
                    phone: phone,
                    grade: grade
                });
                alert('Form submitted successfully');
                memberForm.reset();
            });

            //Edit member func 20240807
            let memkey = "";
            document.addEventListener('click', function (event) {
                const target = event.target;
                if (target.matches('.editBtn') || target.matches('.editBtn i')) {
                    const key = target.dataset.id || target.parentElement.dataset.id; // Get the data-id from the node itself or parent node
                    memkey = key;
                    db.ref(`member/${key}`).once('value', (snapshot) => {
                        const mem = snapshot.val();
                        document.getElementById('edit-employee-name').value = mem.name;
                        document.getElementById('edit-eng-name').value = mem.eng_name;
                        document.getElementById('edit-employee-id').value = mem.id;
                        document.getElementById('edit-hire-date').value = mem.hire_date;
                        document.getElementById('edit-employee-department').value = mem.emp_department;
                        document.getElementById('edit-mail').value = mem.mail;
                        document.getElementById('edit-employee-phone').value = mem.phone;
                        document.getElementById('edit-grade').value = mem.grade;
                    });
                }
            });
            
            document.getElementById('edit-mem-form').addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default submission
            
                const updatedMem = {
                    name: document.getElementById('edit-employee-name').value,
                    eng_name: document.getElementById('edit-eng-name').value,
                    id: document.getElementById('edit-employee-id').value,
                    hire_date: document.getElementById('edit-hire-date').value,
                    emp_department: document.getElementById('edit-employee-department').value,
                    mail: document.getElementById('edit-mail').value,
                    phone: document.getElementById('edit-employee-phone').value,
                    grade: document.getElementById('edit-grade').value,
                };
            
                db.ref(`member/${memkey}`).update(updatedMem)
                    .then(() => {
                        alert('Update successfully! Thành công!');
                        // Close the model editing form
                        $('#modalEditMem').modal('hide');
                    })
                    .catch(error => {
                        console.error("Error while updating: ", error);
                    });
            });

            //Dashboard
            dateForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const selectedDate = datePicker.value;
                const selectedType = dbType.value;
                if (selectedDate && selectedType) {
                    displayLeavesByDate(selectedDate, selectedType);
                } else {
                    alert('Please select a date!');
                }
            });
        
            function displayLeavesByDate(date, type) {
                if (type === "db-leave") {
                    db.ref('leaves').orderByChild('leaveTime').equalTo(date).on('value', (snapshot) => {
                        const leaveTable = document.getElementById('leave-list');
                        leaveTable.style.display = 'table';
                        const leaveTableBody = document.getElementById('leave-list').querySelector('tbody');
                        leaveTableBody.innerHTML = ''; // Clear previous results
                        snapshot.forEach((childSnapshot) => {
                            const leave = childSnapshot.val();
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${leave.memberId}</td>
                                <td>${leave.name}</td>
                                <td>${leave.period}</td>
                                <td>${leave.leaveTime}</td>
                                <td>${leave.startTime}</td>
                                <td>${leave.endTime}</td>
                            `;
                            leaveTableBody.appendChild(row);
                        });
                    });
                } else if (type === "db-overtime") {
                    db.ref('overtime').orderByChild('date').equalTo(date).on('value', (snapshot) => {
                        const otTable = document.getElementById('ot-list');
                        otTable.style.display = 'table';
                        const otTableBody = document.getElementById('ot-list').querySelector('tbody');
                        otTableBody.innerHTML = ''; // Clear previous results
                        snapshot.forEach((childSnapshot) => {
                            const ot = childSnapshot.val();
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${ot.memberId}</td>
                                <td>${ot.name}</td>
                                <td>${ot.date}</td>
                                <td>${ot.ot_hour}</td>
                                <td>${ot.ot_reason}</td>
                                <td>${ot.meal_check}</td>
                            `;
                            otTableBody.appendChild(row);
                        });
                    });
                }
            }

            function displayMember(key, department, eng_name, name, grade, hire_date, id, mail, phone) {
                const memberItem = document.createElement('tr');
                memberItem.innerHTML = `
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${eng_name}</td>
                    <td>${hire_date}</td>
                    <td>${department}</td>
                    <td>${mail}</td>
                    <td>${grade}</td>
                    <td>${phone}</td>
                    <td>
                        <button type="button" class="btn btn-outline-dark editBtn" data-toggle="modal" data-target="#modalEditMem" data-id=${key}>
                            <i class="fi fi-rr-edit"></i>
                        </button>
                    </td>
                `;
                memberList.appendChild(memberItem);
            }

            //DQA job list tab - add job
            let trackno = '';
            let link = '';
            document.addEventListener('click', async function (event) {
            // document.getElementById('add-job-item-form').addEventListener('focusin', async function (event) {
                if (event.target.id === 'add-job-type') {
                    return; // Ignore focus event on job type field
                }
            
                const typeElement = document.getElementById('add-job-type');
                const type = typeElement.value;
                const date = new Date();
                const year = date.getFullYear().toString().slice(-2);
                let tracknoPrefix = '';
            
                switch (type) {
                    case 'software-test':
                        tracknoPrefix = 'DQA-SW-' + year + '-';
                        break;
                    case 'system-test':
                        tracknoPrefix = 'DQA-SYS-' + year + '-';
                        break;
                    case 'regulatory-test':
                        tracknoPrefix = 'DQA-REG-' + year + '-';
                        break;
                    case 'ols':
                        tracknoPrefix = '';
                        break;
                    default:
                        tracknoPrefix = 'DQA-O-' + year + '-';
                }
            
                try {
                    const snapshot = await db.ref('trackno/' + type).orderByKey().limitToLast(1).once('value');
                    let latestTrackNo = null;
                    snapshot.forEach(childSnapshot => {
                        latestTrackNo = childSnapshot.key;
                    });
            
                    let newSuffix = '0001';
                    if (latestTrackNo) {
                        const currentSuffix = parseInt(latestTrackNo.split('-').pop());
                        newSuffix = (currentSuffix + 1).toString().padStart(4, '0');
                    }
                    trackno = tracknoPrefix + newSuffix;
                } catch (error) {
                    console.error('Error fetching the latest track no:', error);
                }
            });
            
            document.getElementById('add-job-type').addEventListener('change', function () {
                const type = this.value;
                // Show/hide fields based on the selected type
                ['software-test', 'system-test', 'regulatory-test', 'ols'].forEach(testType => {
                    document.getElementById(testType + '-fields').classList.add('hidden');
                });
                if (type) {
                    document.getElementById(type + '-fields').classList.remove('hidden');
                }
            });

            document.getElementById('add-job-item-form').addEventListener('submit', (event) => {
                event.preventDefault();
                const model = document.getElementById('add-job-model').value;
                const start_date = document.getElementById('add-job-start-date').value;
                const target_date = document.getElementById('add-job-target-date').value;
                const type = document.getElementById('add-job-type').value;
                const detail = document.getElementById('add-job-details').value;
                const announcer = document.getElementById('add-job-announcer').value;
                const pic = document.getElementById('add-job-pic').value;
                const doc = document.getElementById('add-job-doc').value;
                const finish_date = document.getElementById('add-job-finish-date').value;
                const action = document.getElementById('add-job-action').value;
                const version = document.getElementById('add-job-sw-version').value;
                const status = 'Active';

                link = '\\\\10.100.28.65\\ee\\DQA\\101.Data\\' + trackno;

                let extraFields = {};
                if (type === 'software-test') {
                    extraFields = { 
                        version: document.getElementById('add-job-sw-version').value,
                        dqa_result_date: document.getElementById('add-job-dqa-result-date').value,
                        dqa_result: document.getElementById('add-job-dqa-result').value,
                        final_result_date: document.getElementById('add-job-sw-final-result-date').value,
                        final_result: document.getElementById('add-job-sw-final-result').value,
                        sprint: document.getElementById('add-job-sprint').value
                    };
                    link = '\\\\10.100.28.65\\ee\\DQA\\02.Software\\05.Testing software\\' + model + '\\' + version;
                } else if (type === 'system-test') {
                    extraFields = {
                        version: document.getElementById('add-job-sys-version').value,
                        final_result_date: document.getElementById('add-job-sys-final-result-date').value,
                        final_result: document.getElementById('add-job-sys-final-result').value,
                        test_detail: document.getElementById('add-job-sys-test-detail').value
                    };
                } else if (type === 'regulatory-test') {
                    extraFields = {
                        test_phase: document.getElementById('add-job-test-phase').value,
                        final_result_date: document.getElementById('add-job-reg-final-result-date').value,
                        final_result: document.getElementById('add-job-reg-final-result').value,
                        test_detail: document.getElementById('add-job-reg-test-detail').value
                    };
                } else if (type === 'ols') {
                    extraFields = {
                        ols_num: document.getElementById('add-job-ols').value,
                    };
                    trackno = document.getElementById('add-job-ols').value;
                    link = '\\\\10.100.28.65\\ee\\DQA\\101.Data\\' + trackno;
                }

                db.ref('job_items').push({
                    trackno: trackno,
                    model: model,
                    start_date: start_date,
                    target_date: target_date,
                    link: link,
                    type: type,
                    detail: detail,
                    announcer: announcer,
                    pic: pic,
                    doc: doc,
                    finish_date: finish_date,
                    action: action,
                    status: status,
                    ...extraFields
                });

                db.ref('trackno/' + type + '/' + trackno).set(true);

                alert('Form submitted successfully');
                document.getElementById('add-job-item-form').reset();
                $('#modalAddJobItem').modal('hide');
            });

            // Display job function
            const jobList = document.getElementById('job-list');

            db.ref('job_items').on('value', (snapshot) => {
                jobList.innerHTML = '';
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    const job_item = childSnapshot.val();
                    displayJob(key, job_item.trackno, job_item.model, job_item.start_date, job_item.version, job_item.status, job_item.detail, job_item.action, job_item.doc, job_item.link);
                });
            });

            function displayJob(key, trackno, model, start_date, version, status, detail, action, doc, link) {
                const jobItem = document.createElement('tr');
                jobItem.innerHTML = `
                    <td><a href="${link}" onclick="copyLink(this.href)">${trackno}</a></td>
                    <td>${model}</td>
                    <td>${start_date}</td>
                    <td>${version}</td>
                    <td>${detail}</td>
                    <td>${action}</td>
                    <td class="${status === 'Active' ? 'status-active' : status === 'Closed' ? 'status-closed' : status === 'Pending' ? 'status-pending' : ''}">${status}</td>
                    <td>
                        <button type="button" class="btn btn-outline-dark editBtn" data-toggle="modal" data-target="#modalEditJobItem" data-id=${key}>
                            <i class="fi fi-rr-edit"></i>
                        </button>
                    </td>
                `;
                // <td>${status === 'Active' ? `<span class="badge bg-success">Active</span>` : status}</td>
                jobList.appendChild(jobItem);
            }

            //Search job item function 20240801
            const searchJob = document.getElementById('searchBox_Job');
            function searchJobs(query) {
                db.ref('job_items').once('value', (snapshot) => {
                    jobList.innerHTML = '';
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const job_item = childSnapshot.val();
                        if (job_item.model.toLowerCase().includes(query.toLowerCase()) || 
                            job_item.pic.toLowerCase().includes(query.toLowerCase())) {
                            displayJob(key, job_item.trackno, job_item.model, job_item.start_date, job_item.version, job_item.status, job_item.detail, job_item.action, job_item.doc, job_item.link);
                        }
                    });
                });
            }
    
            searchJob.addEventListener('input', (event) => {
                const query = event.target.value;
                searchJobs(query);
            });

            // Edit job func 20240729
            let jobkey = "";

            document.addEventListener('click', function (event) {
                const target = event.target;

                if (target.matches('.editBtn') || target.matches('.editBtn i')) {
                    const key = target.dataset.id || target.parentElement.dataset.id; // Get the data-id from the node itself or parent node
                    jobkey = key;
                    db.ref(`job_items/${key}`).once('value', (snapshot) => {
                        const job_item = snapshot.val();
                        document.getElementById('edit-job-model').value = job_item.model;
                        document.getElementById('edit-job-start-date').value = job_item.start_date;
                        document.getElementById('edit-job-target-date').value = job_item.target_date;
                        document.getElementById('edit-job-type').value = job_item.type;
                        document.getElementById('edit-job-details').value = job_item.detail;
                        document.getElementById('edit-job-announcer').value = job_item.announcer;
                        document.getElementById('edit-job-pic').value = job_item.pic;
                        document.getElementById('edit-job-doc').value = job_item.doc;
                        document.getElementById('edit-job-finish-date').value = job_item.finish_date;
                        document.getElementById('edit-job-action').value = job_item.action;
                        document.getElementById('edit-job-status').value = job_item.status;
                        document.getElementById('edit-job-link').value = job_item.link;

                        // Reset visibility of all specific fields
                        document.getElementById('edit-software-test-fields').classList.add('hidden');
                        document.getElementById('edit-system-test-fields').classList.add('hidden');
                        document.getElementById('edit-regulatory-test-fields').classList.add('hidden');
                        document.getElementById('edit-ols-fields').classList.add('hidden');

                        // Display fields based on job type and set values
                        if (job_item.type === 'software-test') {
                            document.getElementById('edit-software-test-fields').classList.remove('hidden');
                            document.getElementById('edit-job-sw-version').value = job_item.version || '';
                            document.getElementById('edit-job-dqa-result-date').value = job_item.dqa_result_date || '';
                            document.getElementById('edit-job-dqa-result').value = job_item.dqa_result || '';
                            document.getElementById('edit-job-sw-final-result-date').value = job_item.final_result_date || '';
                            document.getElementById('edit-job-sw-final-result').value = job_item.final_result || '';
                            document.getElementById('edit-job-sprint').value = job_item.sprint || '';
                        } else if (job_item.type === 'system-test') {
                            document.getElementById('edit-system-test-fields').classList.remove('hidden');
                            document.getElementById('edit-job-sys-version').value = job_item.version || '';
                            document.getElementById('edit-job-sys-final-result-date').value = job_item.final_result_date || '';
                            document.getElementById('edit-job-sys-final-result').value = job_item.final_result || '';
                            document.getElementById('edit-job-sys-test-detail').value = job_item.test_detail || '';
                        } else if (job_item.type === 'regulatory-test') {
                            document.getElementById('edit-regulatory-test-fields').classList.remove('hidden');
                            document.getElementById('edit-job-test-phase').value = job_item.test_phase || '';
                            document.getElementById('edit-job-reg-final-result-date').value = job_item.final_result_date || '';
                            document.getElementById('edit-job-reg-final-result').value = job_item.final_result || '';
                            document.getElementById('edit-job-reg-test-detail').value = job_item.test_detail || '';
                        } else if (job_item.type === 'ols') {
                            document.getElementById('edit-ols-fields').classList.remove('hidden');
                            document.getElementById('edit-job-ols').value = job_item.ols_num || '';
                        }
                    });
                }
            });

            document.getElementById('edit-job-item-form').addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default submission

                const updatedJob = {
                    model: document.getElementById('edit-job-model').value,
                    start_date: document.getElementById('edit-job-start-date').value,
                    target_date: document.getElementById('edit-job-target-date').value,
                    type: document.getElementById('edit-job-type').value,
                    detail: document.getElementById('edit-job-details').value,
                    announcer: document.getElementById('edit-job-announcer').value,
                    pic: document.getElementById('edit-job-pic').value,
                    doc: document.getElementById('edit-job-doc').value,
                    finish_date: document.getElementById('edit-job-finish-date').value,
                    action: document.getElementById('edit-job-action').value,
                    status: document.getElementById('edit-job-status').value,
                    link: document.getElementById('edit-job-link').value
                };

                // Add extra fields based on job type
                if (updatedJob.type === 'software-test') {
                    updatedJob.version = document.getElementById('edit-job-sw-version').value;
                    updatedJob.dqa_result_date = document.getElementById('edit-job-dqa-result-date').value;
                    updatedJob.dqa_result = document.getElementById('edit-job-dqa-result').value;
                    updatedJob.final_result_date = document.getElementById('edit-job-sw-final-result-date').value;
                    updatedJob.final_result = document.getElementById('edit-job-sw-final-result').value;
                    updatedJob.sprint = document.getElementById('edit-job-sprint').value;
                } else if (updatedJob.type === 'system-test') {
                    updatedJob.version = document.getElementById('edit-job-sys-version').value;
                    updatedJob.final_result_date = document.getElementById('edit-job-sys-final-result-date').value;
                    updatedJob.final_result = document.getElementById('edit-job-sys-final-result').value;
                    updatedJob.test_detail = document.getElementById('edit-job-sys-test-detail').value;
                } else if (updatedJob.type === 'regulatory-test') {
                    updatedJob.test_phase = document.getElementById('edit-job-test-phase').value;
                    updatedJob.final_result_date = document.getElementById('edit-job-reg-final-result-date').value;
                    updatedJob.final_result = document.getElementById('edit-job-reg-final-result').value;
                    updatedJob.test_detail = document.getElementById('edit-job-reg-test-detail').value;
                } else if (updatedJob.type === 'ols') {
                    updatedJob.ols_num = document.getElementById('edit-job-ols').value;
                }

                db.ref(`job_items/${jobkey}`).update(updatedJob)
                    .then(() => {
                        alert('Update successfully! Thành công!');
                        // Close the modal editing form
                        $('#modalEditJobItem').modal('hide');
                    })
                    .catch(error => {
                        console.error("Error while updating: ", error);
                    });
            });

            //Hide update and show as a button
            const uploadBtn = document.querySelector('.uploadBtn');
            const fileInput = document.getElementById('file-upload');

            uploadBtn.addEventListener('click', () => {
                fileInput.click();
            });

            //Function filter status
            document.addEventListener('DOMContentLoaded', function() {
                // Initially load all jobs
                filterJobsByStatus('All');
                
            });

            // Add event listeners to dropdown items
            document.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', function(event) {
                    event.preventDefault();
                    const status = this.getAttribute('data-status');
                    filterJobsByStatus(status);
                });
            });
            
            function filterJobsByStatus(status) {
                const jobList = document.getElementById('job-list');
                jobList.innerHTML = ''; // Clear the current job list
            
                let query = db.ref('job_items');
                if (status !== 'All') {
                    query = query.orderByChild('status').equalTo(status);
                }
            
                query.once('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                        const job = childSnapshot.val();
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td><a href="${job.link}" onclick="copyLink(this.href)">${job.trackno}</a></td>
                            <td>${job.model}</td>
                            <td>${job.start_date}</td>
                            <td>${job.version}</td>
                            <td>${job.detail}</td>
                            <td>${job.action}</td>
                            <td class="${job.status === 'Active' ? 'status-active' : job.status === 'Closed' ? 'status-closed' : job.status === 'Pending' ? 'status-pending' : ''}">${job.status}</td>
                            <td>
                                <button type="button" class="btn btn-outline-dark editBtn" data-toggle="modal" data-target="#modalEditJobItem" data-id="${childSnapshot.key}">
                                    <i class="fi fi-rr-edit"></i>
                                </button>
                            </td>
                        `;
                        jobList.appendChild(row);
                    });
                });
            }


            
            // Listen for click events on dynamically generated edit buttons
            document.addEventListener('click', function(event) {
                const target = event.target;
                if (target.closest('.editBtn')) {
                    const key = target.closest('.editBtn').getAttribute('data-id');
                    // Handle edit button click here using the 'key'
                }
            });

            //Update DB through Excel
            // document.getElementById('file-upload').addEventListener('change', function(event) {
            //     const file = event.target.files[0];
                
            //     if (!file) {
            //         alert('Please choose a file first!');
            //         return;
            //     }
            
            //     const confirmUpload = confirm('Do you want to upload this file?');
            
            //     if (!confirmUpload) {
            //         return;
            //     }
            
            //     const reader = new FileReader();
            
            //     reader.onload = function(e) {
            //         const data = new Uint8Array(e.target.result);
            //         const workbook = XLSX.read(data, { type: 'array' });
            
            //         // Assume the first sheet is the one we want to read
            //         const sheetName = workbook.SheetNames[0];
            //         const worksheet = workbook.Sheets[sheetName];
            
            //         // Convert sheet to JSON
            //         const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            //         // Function to update Firebase database
            //         updateFirebaseDatabase(jsonData);
            //     };
            
            //     reader.readAsArrayBuffer(file);
            // });
            
            // function updateFirebaseDatabase(data) {
            //     data.forEach(job => {
            //         const newJobKey = db.ref().child('job_items').push().key;
            //         db.ref('job_items/' + newJobKey).set(job, function(error) {
            //             if (error) {
            //                 console.error("Error updating database: ", error);
            //             } else {
            //                 console.log("Data updated successfully!");
            //             }
            //         });
            //     });
            // }

            document.getElementById('file-upload').addEventListener('change', handleFileSelect);

            async function handleFileSelect(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, {type: 'array'});
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
                    const keys = jsonData[0];
                    const values = jsonData.slice(1).map(row => {
                        const obj = {};
                        keys.forEach((key, i) => {
                            obj[key] = row[i];
                        });
                        return obj;
                    });
    
                    if (confirm('Are you sure you want to upload this data to the database?')) {
                        updateFirebaseDatabase(values);
                    }
                };
    
                reader.readAsArrayBuffer(file);
            }
    
            async function getNewTrackno(type) {
                const date = new Date();
                const year = date.getFullYear().toString().slice(-2);
                let tracknoPrefix = '';
    
                if (type === 'software-test') {
                    tracknoPrefix = 'DQA-SW-' + year + '-';
                } else if (type === 'system-test') {
                    tracknoPrefix = 'DQA-SYS-' + year + '-';
                } else if (type === 'regulatory-test') {
                    tracknoPrefix = 'DQA-REG-' + year + '-';
                } else if (type === 'ols') {
                    return null; // Return null if type is 'ols' since we will handle this separately
                } else {
                    tracknoPrefix = 'DQA-O-' + year + '-';
                }
    
                const snapshot = await db.ref('trackno/' + type).orderByKey().limitToLast(1).once('value');
                let latestTrackNo = null;
                snapshot.forEach(childSnapshot => {
                    latestTrackNo = childSnapshot.key;
                });
    
                let newSuffix = '0001';
                if (latestTrackNo) {
                    const currentSuffix = parseInt(latestTrackNo.split('-').pop());
                    newSuffix = (currentSuffix + 1).toString().padStart(4, '0');
                }
    
                return tracknoPrefix + newSuffix;
            }
    
            async function updateFirebaseDatabase(data) {
                for (const job of data) {
                    if (job.type === 'ols' && job.ols_num) {
                        job.trackno = job.ols_num;
                    } else {
                        const trackno = await getNewTrackno(job.type);
                        job.trackno = trackno;
                    }
    
                    // Remove undefined properties
                    const cleanedJob = {};
                    Object.keys(job).forEach(key => {
                        if (job[key] !== undefined) {
                            cleanedJob[key] = job[key];
                        }
                    });
    
                    const newJobKey = db.ref().child('job_items').push().key;
                    db.ref('job_items/' + newJobKey).set(cleanedJob, function(error) {
                        if (error) {
                            console.error("Error updating database: ", error);
                        } else {
                            console.log("Data updated successfully!");
                        }
                    });
    
                    if (job.type !== 'ols') {
                        // Update trackno database
                        db.ref('trackno/' + job.type + '/' + job.trackno).set(true);
                    }
                }
            }

            // Function to fetch data from Firebase and export to Excel
            async function exportToExcel() {
                try {
                    const snapshot = await db.ref('job_items').once('value');
                    const data = snapshot.val();

                    if (!data) {
                        alert('No data found');
                        return;
                    }

                    // Convert the data into an array of objects
                    const exportData = Object.keys(data).map(key => {
                        return { id: key, ...data[key] };
                    });

                    // Create a new workbook and add the data
                    const wb = XLSX.utils.book_new();
                    const ws = XLSX.utils.json_to_sheet(exportData);
                    XLSX.utils.book_append_sheet(wb, ws, "Job Items");

                    // Export the workbook
                    XLSX.writeFile(wb, 'job_items.xlsx');
                } catch (error) {
                    console.error("Error exporting data: ", error);
                    alert('Failed to export data');
                }
            }

            document.getElementById('export-btn').addEventListener('click', exportToExcel);

            loadData();
        });

        // Handle return requests 20240626
        function handleDelete(event) {
            const equipmentId = event.target.dataset.id; // Suppose the id is stored in the data-id attribute of the button
        
            // Show confirmation pop-up
            if (confirm('Are you sure you want to delete this equipment?')) {
                const db = firebase.database();
                const equipmentRef = db.ref('equipment/' + equipmentId);
        
                equipmentRef.remove().then(() => {
                    alert('Equipment deleted successfully!');
                    location.reload();
                }).catch(error => {
                    console.error('Error deleting equipment: ', error);
                });
            }
        }

        //Copy link to clipboard
        function copyLink(link) {
            // Create a temporary input tag to store the link
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = link;
            
            // Focus on input and select all content
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); // For mobile devices
            
            // Copy content to clipboard
            document.execCommand("copy");
            
            // Delete temporary input tag
            document.body.removeChild(tempInput);
            
            // Notify users (optional)
            alert("Saved!");
            }