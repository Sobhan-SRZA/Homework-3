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

class Main {
       constructor() {
              this.cart = [];
              this.loggedInUser = null;
              this.currentCaptcha = null;
              this.forumeAction = document.querySelector(".signup-action");
              this.forum = document.getElementById("forum");
              this.renderForm();
              this.attachEvents();
              this.renderProducts();
       }

       attachEvents() {
              this.forumeAction.addEventListener("click", () => this.toggleForm());
       }

       renderForm(isLogin = false) {
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
                            <label for="captcha" class="single">راستی آزمایی | ${this.genCaptcha()}</label>
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
                            <label for="captcha" class="single">راستی آزمایی | ${this.genCaptcha()}</label>
                            <input type="number" class="single captcha pointer" id="single-input" placeholder="لطفا کد کپچا رو وارد کنید." required>
                     </div>
              `;
              if (isLogin) {
                     this.forumeAction.innerText = "حساب کاربری ندارید؟ برای ساخت حساب کلیک کنید.";
                     this.forum.innerHTML = this.create_forum_code;
              }

              else {
                     this.forumeAction.innerText = "حساب کاربری دارید؟ برای ورود کلیک کنید.";
                     this.forum.innerHTML = this.login_forum_code;
              }
       }

       toggleForm() {
              const isLoginMode = this.forumeAction.id === "no_acc";
              this.forumeAction.id = isLoginMode ? "create_acc" : "no_acc";
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

       attachProductEvents() {
              document.querySelector('.products').addEventListener('click', (e) => {
                     if (e.target.classList.contains('products__item--button')) {
                            if (!this.loggedInUser) { // نیاز به بررسی لاگین کاربر
                                   alert('لطفا ابتدا وارد حساب کاربری خود شوید!');
                                   this.toggleForm(true);
                                   return;
                            }
                            const productName = e.target.id.replace('product-', '');
                            const product = products.find(p => p.name === productName);
                            this.addToCart(product);
                     }
              });
       }

       addToCart(product) {
              this.cart.push(product);
              this.updateCartDisplay();
       }

       updateCartDisplay() {
              const total = this.cart.reduce((sum, item) => sum + item.price, 0);
              document.querySelector('.shopping-cart').innerHTML = `
                <h3>سبد خرید (${this.cart.length} آیتم)</h3>
                <p>مجموع: ${total.toLocaleString()} تومان</p>
              `;
       }

       /**
        * 
        * @param {number} size 
        * @returns {string}
        */
       genCaptcha(size = 5) {
              // const length = 10 ** size;
              // const resualt = Math.floor(Math.random() * length);
              let resualt = "";
              for (let i = 0; i < size; i++)
                     resualt += String(Math.floor(Math.random() * 10));

              const captcha = String(resualt);
              this.currentCaptcha = captcha;
              return captcha;
       }

       checkCaptcha(captcha, isLogin = false) {
              if (captcha !== this.currentCaptcha) {
                     alert("کد راستی آزمایی وارد شده اشتباه است!");
                     this.renderForm(isLogin);
                     return false;
              }
              return true;
       }

       login() {
              const email = document.querySelector('.email').value;
              const password = document.querySelector('.password').value;
              const captcha = document.querySelector('.captcha').value;

              if (!this.checkCaptcha(captcha, true)) return;

              // منطق لاگین واقعی اینجا اضافه میشه
              this.loggedInUser = { email }; // برای تست
              alert('با موفقیت وارد شدید!');
              this.toggleForm(true);
       }

       signup() {
              const name = document.querySelector('.name').value;
              const email = document.querySelector('.email').value;
              const password = document.querySelector('.password').value;
              const captcha = document.querySelector('.captcha').value;

              if (!this.checkCaptcha(captcha)) return;

              // منطق ثبت نام واقعی اینجا
              this.loggedInUser = { name, email }; // برای تست
              alert('ثبت نام موفق!');
              this.toggleForm();
       }
}

window.addEventListener("DOMContentLoaded", () => new Main());