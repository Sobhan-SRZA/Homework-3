// تمرین صفحه لاگین: گرفتن یوزر نیم و بررسی درست بودن
// تمرین پروژه ای که کد کپچپای 5 رقمی به صورت تصادفی بسازد.
//  تمرین سایت فروشگاهی کاربر 5 محصول انتخاب میکند و قیمت 5 محصول رو گرفته و جمع کرده و نمایش بده
const products = [
       {
              name: "کفش",
              price: 829_500
       },
       {
              name: "کیف",
              price: 402_000
       },
       {
              name: "ساعت",
              price: 562_000
       },
       {
              name: "گوشی",
              price: 68_500_000
       },
       {
              name: "دستبند",
              price: 150_000
       }
];

const users = [
       {
              name: "سبحان",
              email: "sobhan@gmail.com",
              password: "123456789"
       }
];

let currentCaptcha = undefined;
let loggedInUser = null;

class Main {
       constructor() {
              this.cart = [];
              currentCaptcha = this.genCaptcha();
              this.renderForm();
              this.renderProducts();
              this.attachEvents();
              this.addLiveValidation();
       }

       addLiveValidation() {
              document.addEventListener('input', (e) => {
                     const input = e.target;
                     if (input.classList.contains('name')) {
                            this.validateField(input, 'text');
                     }

                     if (input.classList.contains('email')) {
                            this.validateField(input, 'email');
                     }

                     if (input.classList.contains('password')) {
                            this.validateField(input, 'password');
                     }

                     if (input.classList.contains('captcha')) {
                            this.validateField(input, 'captcha');
                     }
              });
       }

       attachEvents() {
              document.querySelector(".signup-action")?.addEventListener("click", (e) => {
                     this.toggleForm(e.target.id !== "signup")
              });

              document.querySelector('.products').addEventListener('click', (e) => {
                     if (e.target.classList.contains('products__item--button')) {
                            if (!loggedInUser) {
                                   alert('لطفا ابتدا وارد حساب کاربری خود شوید!');
                                   return;
                            }

                            const productName = e.target.getAttribute('data-product');
                            const product = products.find(p => p.name === productName);
                            console.log(productName);
                            console.log(product);
                            this.addToCart(product);
                            return;
                     }
              });
       }

       renderForm(isLogin = false) {
              currentCaptcha = this.genCaptcha();
              this.create_forum_code = `                     
                     <div class="input-row">
                            <label for="email" class="first" id="first-label">ایمیل</label>
                            <input type="email" class="first email pointer" id="first-input" placeholder="ایمیل خود را وارد کنید." required>
                     </div>

                     <div class="input-row">
                            <label for="password" class="middle">گذرواژه</label>
                            <input type="password" class="middle password pointer" placeholder="گذرواژه خود را وارد کنید." required>
                     </div>

                     <div class="input-row">
                            <input type="submit" class="last signin pointer" id="last-input" value="ورود" onclick="Main.prototype.login()">
                     </div>

                     <div class="input-row">
                            <label for="captcha" class="single" id="captcha">${currentCaptcha}</label>
                            <input type="number" class="single captcha pointer" id="single-input" placeholder="لطفا کد کپچا رو وارد کنید." required>
                     </div>
              `;

              this.login_forum_code = `                     
                     <div class="input-row">
                            <label for="name" class="first" id="first-label">نام</label>
                            <input type="text" class="first name pointer" id="first-input" placeholder="نام خود را وارد کنید." required>
                     </div>

                     <div class="input-row">
                            <label for="email" class="middle">ایمیل</label>
                            <input type="email" class="middle email pointer" placeholder="ایمیل خود را وارد کنید." required>
                     </div>

                     <div class="input-row">
                            <label for="password" class="middle">گذرواژه</label>
                            <input type="password" class="middle password pointer" placeholder="گذرواژه خود را وارد کنید." required>
                     </div>

                     <div class="input-row">
                            <input type="submit" class="last signup pointer" id="last-input" value="ثبت نام" onclick="Main.prototype.signup()">
                     </div>

                     <div class="input-row">
                            <label for="captcha" class="single">${currentCaptcha}</label>
                            <input type="number" class="single captcha pointer" id="single-input" placeholder="لطفا کد کپچا رو وارد کنید." required>
                     </div>
              `;

              if (loggedInUser) {
                     document.getElementById("getstart").innerHTML = `
                            <div>
                                   <h3>پروفایل</h3>
                                   <p>${loggedInUser.name || loggedInUser.email} جان خوش اومدی!</p>
                            </div>
                     `;

                     return;
              }

              const action = document.querySelector(".signup-action");
              const forum = document.getElementById("forum");
              if (isLogin) {
                     action.setAttribute("id", "signup");
                     action.innerText = "حساب کاربری ندارید؟ برای ساخت حساب کلیک کنید.";
                     forum.innerHTML = this.create_forum_code;
                     return;
              }

              else {
                     action.setAttribute("id", "signin");
                     action.innerText = "حساب کاربری دارید؟ برای ورود کلیک کنید.";
                     forum.innerHTML = this.login_forum_code;
                     return;
              }
       }

       toggleForm(isLoginMode) {
              this.renderForm(isLoginMode);
       }

       renderProducts() {
              const grid = document.querySelector(".products");
              grid.innerHTML = products.map(p => `
                <div class="products__item">
                  <img class="products__item--icon" src="images/${p.name}.png">
                  <h3 class="products__item--title">${p.name}</h3>
                  <p class="products__item--price">${p.price.toLocaleString()} تومان</p>
                  <button class="products__item--button" data-product="${p.name}">انتخاب</button>
                </div>
              `).join('');
       }

       addToCart(product) {
              this.cart.push(product);
              this.updateCart();
       }

       updateCart() {
              const shoppingCart = document.querySelector('.shopping-cart');
              shoppingCart.style.display = "flex";
              const cartItems = document.querySelector('.cart-items');
              const totalPrice = document.querySelector('.total-price');

              cartItems.innerHTML = `
                     <h3>لیست خرید</h3>
                     ${this.cart.map(item => `
                            <div class="cart-item">
                                   <span>${item?.name}</span>
                                   <span>${item?.price?.toLocaleString()} تومان</span>
                            </div>
                     `).join('')}
              `;

              const total = this.cart.reduce((sum, item) => sum + item.price, 0);
              totalPrice.textContent = `مجموع: ${total.toLocaleString()} تومان`;
       }

       genCaptcha(size = 5) {
              let resualt = "";
              for (let i = 0; i < size; i++)
                     resualt += String(Math.floor(Math.random() * 10));

              const captcha = String(resualt);
              return captcha;
       }

       checkCaptcha(input, captcha, isLogin = false) {
              console.log(captcha);
              console.log(captcha !== currentCaptcha);
              if (captcha !== currentCaptcha) {
                     this.showError(input, 'کد راستی آزمایی وارد شده اشتباه است!');
                     return false;
              }

              return true;
       }

       showSuccess(message) {
              const successDiv = `<div class="success-message">${message}</div>`;

              const form = document.getElementById('forum');
              form.innerHTML = successDiv;
       }

       validateField(input, type) {
              const value = input.value.trim();
              const error = input.parentElement.querySelector('.error-message');

              input.classList.remove('input-error');
              if (error)
                     error.style.display = 'none';

              if (!value) {
                     this.showError(input, 'این فیلد الزامی است');
                     return false;
              }

              if (type === 'email' && !this.validateEmail(value)) {
                     this.showError(input, 'فرمت ایمیل نامعتبر است');
                     return false;
              }

              if (type === 'password' && value.length < 6) {
                     this.showError(input, 'رمز عبور باید حداقل 6 کاراکتر باشد');
                     return false;
              }

              if (type === 'captcha' && value.length < 5) {
                     this.showError(input, 'کد راستی آزمایی باید 5 کاراکتر باشد');
                     return false;
              }

              return true;
       }

       validateEmail(email) {
              const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return re.test(email);
       }

       showError(input, message) {
              const parent = input.parentElement;
              let error = parent.querySelector('.error-message');

              if (!error) {
                     error = document.createElement('div');
                     error.className = 'error-message';
                     parent.appendChild(error);
              }

              input.classList.add('input-error');
              error.textContent = message;
              error.style.display = 'block';
       }

       login() {
              const emailInput = document.querySelector('.email');
              const passwordInput = document.querySelector('.password');
              const captchaInput = document.querySelector('.captcha');

              const isValidEmail = this.validateField(emailInput, 'email');
              const isValidPass = this.validateField(passwordInput, 'password');
              const isValidCaptcha = this.validateField(captchaInput, 'captcha');

              if (!isValidEmail || !isValidPass || !isValidCaptcha) return;

              if (!this.checkCaptcha(captchaInput, captchaInput.value, true))
                     return;

              const userData = { email: emailInput.value, password: passwordInput.value };
              const isLogged = users.find(a => a.email === userData.email);
              if (isLogged) {
                     if (userData.password === isLogged.password) {
                            loggedInUser = userData;
                            this.showSuccess('با موفقیت وارد شدید!');
                            this.toggleForm(true);
                            return
                     }

                     else {
                            this.showError(passwordInput, 'گذرواژه صحیح نمیباشد!');
                            return;
                     }
              }

              else {
                     this.showError(emailInput, 'شما ثبت نام نکرده اید!');
                     return;
              }
       }

       signup() {
              const nameInput = document.querySelector('.name');
              const emailInput = document.querySelector('.email');
              const passwordInput = document.querySelector('.password');
              const captchaInput = document.querySelector('.captcha');

              const isValidName = this.validateField(nameInput, 'text');
              const isValidEmail = this.validateField(emailInput, 'email');
              const isValidPass = this.validateField(passwordInput, 'password');
              const isValidCaptcha = this.validateField(captchaInput, 'captcha');

              if (!isValidName || !isValidEmail || !isValidPass || !isValidCaptcha) return;

              if (!this.checkCaptcha(captchaInput, captchaInput.value, false))
                     return;

              const userData = { name: nameInput.value, email: emailInput.value, password: passwordInput.value };
              const isLogged = users.some(a => a.email === userData.email);
              if (isLogged) {
                     this.showError(emailInput, 'شما قبلا با این ایمیل ثبت نام کرده اید لطفا وارد شوید!');
                     return;
              }

              loggedInUser = userData;
              users.push(userData);
              this.showSuccess('ثبت نام با موفقیت انجام شد!');
              this.toggleForm(true);

              return;
       }
}

window.addEventListener("DOMContentLoaded", () => new Main());