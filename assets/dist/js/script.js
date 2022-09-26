// Get element by id
var pname = document.getElementById('productName');
var pprice = document.getElementById('productPrice');
var pdescription = document.getElementById('productDescription');
var pcategory = document.getElementById('productCategory');

// Get table by id
var table = document.getElementById('tableBody');

// Search input
var search = document.getElementById('searchByName');

// Get main btn
var mainBtn = document.getElementById('mainBtn');

// Title element by id
var title_ele = document.getElementById('operatin');
title_ele.innerHTML = 'Add';

// Product Array
var products;

// Global index
var gindex;

// If local storage is not empty
if (localStorage.getItem('products') != null) {
    products = JSON.parse(localStorage.getItem('products'));
    displayData(products);
} else {
    products = [];
}

// Add product function
function addProduct() {

    // Data validation
    if (productNameValidation() && productPriceValidation() &&
        productDescriptionValidation() && productCategoryValidation()) {


        // Get values from input fields and store in object
        var product = {
            name: pname.value,
            price: pprice.value,
            description: pdescription.value,
            category: pcategory.value
        }

        // Push object to products array
        products.push(product);

        // Store products array in local storage
        localStorage.setItem('products', JSON.stringify(products));

        // Display data
        displayData(products);

        // Clear input fields
        clearFields();
    }
}

// Display data function
function displayData(list) {
    // If products array is empty
    if (products.length == 0) {
        table.innerHTML = '<tr><td colspan="6" class="text-center">No products found</td></tr>';
    } else {
        var data = ``;
        for (var i = 0; i < list.length; i++) {
            data += `<tr>
                    <th scope="row" class="text-center">${i + 1}</th>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].category}</td>
                    <td>${list[i].description}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-primary my-2 mx-1" title="Edit" onclick="editProduct(${i})">
                            <i class="icon update"></i>
                        </button>
                        <button class="btn btn-sm btn-danger my-2 mx-1" title="Delete" onclick="deleteProduct(${i})">
                            <i class="icon delete"></i>
                        </button>
                    </td>
                </tr>`;
        }
        table.innerHTML = data;
    }
    if (products.length == 0) {
        search.disabled = true;
    } else {
        search.disabled = false;
    }
}

// Clear input fields function
function clearFields() {
    pname.value = '';
    pprice.value = '';
    pdescription.value = '';
    pcategory.value = '';

    // Remove all classes (is-valid, is-invalid)
    pname.classList.remove('is-valid');
    pname.classList.remove('is-invalid');

    pprice.classList.remove('is-valid');
    pprice.classList.remove('is-invalid');

    pdescription.classList.remove('is-valid');
    pdescription.classList.remove('is-invalid');

    pcategory.classList.remove('is-valid');
    pcategory.classList.remove('is-invalid');

    // Focus on product name
    pname.focus();
}

// Edit product function
function editProduct(index) {
    clearFields();
    pname.value = products[index].name;
    pprice.value = products[index].price;
    pdescription.value = products[index].description;
    pcategory.value = products[index].category;
    mainBtn.innerHTML = 'Update';
    mainBtn.setAttribute('title', 'Update product');
    title_ele.innerHTML = 'Update';
    gindex = index;
}

// Delete product function
function deleteProduct(index) {
    clearFields();
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayData(products);
    }
}

// Search product function, Highlight search text in table
function searchProduct() {
    var searchPattern = search.value;
    var searchResult = [];
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchPattern.toLowerCase())) {
            searchResult.push(products[i]);
        }
    }
    if (searchResult.length == 0) {
        table.innerHTML = '<tr><td colspan="6" class="text-center">No products found</td></tr>';
    } else {
        displayData(searchResult);
    }
}

// On edit product
function onEditProduct() {
    products[gindex].name = pname.value;
    products[gindex].price = pprice.value;
    products[gindex].description = pdescription.value;
    products[gindex].category = pcategory.value;
    localStorage.setItem('products', JSON.stringify(products));
    displayData(products);
    clearFields();
    mainBtn.innerHTML = 'Add';
    title_ele.innerHTML = 'Add';
    mainBtn.setAttribute('title', 'Add product');
}


// If main button is clicked, call addProduct function or onEditProduct function
mainBtn.addEventListener('click', function () {
    if (productNameValidation() && productPriceValidation() &&
        productDescriptionValidation() && productCategoryValidation()) {
        if (mainBtn.innerHTML == 'Add')
            addProduct();
        else
            onEditProduct();
    } else {
        alert('Please fill the form correctly');
    }
});

// Product name pattern validation function
function productNameValidation() {
    var namePattern = /^[a-zA-Z ]{3,30}$/;
    if (pname.value.match(namePattern)) {
        pname.classList.remove('is-invalid');
        pname.classList.add('is-valid');
        return true;
    } else {
        pname.classList.remove('is-valid');
        pname.classList.add('is-invalid');
        return false;
    }
    // error message: Product name must be 3 to 30 characters (letters only)
    // success message: Product name is valid
}

// Product price pattern validation function
function productPriceValidation() {
    var pricePattern = /^[1-9]{1}[0-9]{0,8}$/;
    if (pprice.value.match(pricePattern)) {
        pprice.classList.remove('is-invalid');
        pprice.classList.add('is-valid');
        return true;
    } else {
        pprice.classList.remove('is-valid');
        pprice.classList.add('is-invalid');
        return false;
    }
    // error message: Product price must be 1 to 9 digits (numbers only)
    // success message: Product price is valid
}

// Product description pattern validation function
function productDescriptionValidation() {
    var descriptionPattern = /^[a-zA-Z 0-9]{3,255}$/;
    if (pdescription.value.match(descriptionPattern)) {
        pdescription.classList.remove('is-invalid');
        pdescription.classList.add('is-valid');
        return true;
    } else {
        pdescription.classList.remove('is-valid');
        pdescription.classList.add('is-invalid');
        return false;
    }
    // error message: Product description must be 3 to 255 characters (letters and numbers only)
    // success message: Product description is valid
}

// Product category pattern validation function
function productCategoryValidation() {
    var categoryPattern = /^[a-zA-Z ]{3,30}$/;
    if (pcategory.value.match(categoryPattern)) {
        pcategory.classList.remove('is-invalid');
        pcategory.classList.add('is-valid');
        return true;
    } else {
        pcategory.classList.remove('is-valid');
        pcategory.classList.add('is-invalid');
        return false;
    }
    // error message: Product category must be 3 to 30 characters (letters only)
    // success message: Product category is valid
}

// On keyup event
pname.addEventListener('keyup', productNameValidation);
pprice.addEventListener('keyup', productPriceValidation);
pdescription.addEventListener('keyup', productDescriptionValidation);
pcategory.addEventListener('keyup', productCategoryValidation);

// On search
search.addEventListener('keyup', function () {
    if (search.value == '') {
        displayData(products);
    } else {
        if (products.length > 0) {
            searchProduct();
        } else {
            alert('No products found');
            search.value = '';
        }
    }
});