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
       }
];

class Main {
       constructor() {
              this.signupBtn = document.querySelector(".signup-action");
              this.forum = document.getElementById("forum");
              this.renderForm();
              this.attachEvents();
              this.renderProducts();
       }

       handle() {
              this.signup.addEventListener("click", () => {
                     const id = this.signup.id;
                     if (id === "no_acc") {
                            this.signup.innerText = "حساب کاربری ندارید؟ برای ساخت حساب کلیک کنید.";
                            this.signup.setAttribute("id", "create_acc");
                            this.forum.innerHTML = `                     
                                   <div class="input-row">
                                   <label for="email" class="first" id="first-label">ایمیل</label>
                                   <input type="email" class="first email pointer" id="first-input" placeholder="ایمیل خود را وارد کنید.">
                                   </div>

                                   <div class="input-row">
                                   <label for="password" class="middle">گذرواژه</label>
                                   <input type="password" class="middle password pointer" placeholder="گذرواژه خود را وارد کنید.">
                                   </div>

                                   <div class="input-row">
                                   <input type="submit" class="last signin pointer" id="last-input" value="ورود">
                                   </div>
                            `;
                     }

                     else {
                            this.signup.innerText = "حساب کاربری دارید؟ برای ورود کلیک کنید.";
                            this.signup.setAttribute("id", "no_acc");
                            this.forum.innerHTML = `                     
                                   <div class="input-row">
                                   <label for="name" class="first" id="first-label">نام</label>
                                   <input type="text" class="first name pointer" id="first-input" placeholder="نام خود را وارد کنید.">
                                   </div>

                                   <div class="input-row">
                                   <label for="lastname" class="middle">نام خانوادگی</label>
                                   <input type="text" class="middle lastname pointer" placeholder="نام خانوادگی خود را وارد کنید.">
                                   </div>

                                   <div class="input-row">
                                   <label for="phone-number" class="middle">شماره همراه</label>
                                   <input type="tel" class="middle phone-number pointer" placeholder="شماره همراه خود را وارد کنید.">
                                   </div>

                                   <div class="input-row">
                                   <label for="email" class="middle">ایمیل</label>
                                   <input type="email" class="middle email pointer" placeholder="ایمیل خود را وارد کنید.">
                                   </div>

                                   <div class="input-row">
                                   <label for="password" class="middle">گذرواژه</label>
                                   <input type="password" class="middle password pointer" placeholder="گذرواژه خود را وارد کنید.">
                                   </div>

                                   <div class="input-row">
                                   <input type="submit" class="last signup pointer" id="last-input" value="ثبت نام">
                                   </div>
                            `;
                     }
              });
       }

       attachEvents() {
              this.signupBtn.addEventListener("click", () => this.toggleForm());
       }

       renderForm(isLogin = false) {
              if (isLogin) {
                     this.signupBtn.innerText = "حساب کاربری ندارید؟ برای ساخت حساب کلیک کنید.";
                     this.forum.innerHTML = `                     
                            <div class="input-row">
                            <label for="email" class="first" id="first-label">ایمیل</label>
                            <input type="email" class="first email pointer" id="first-input" placeholder="ایمیل خود را وارد کنید.">
                            </div>

                            <div class="input-row">
                            <label for="password" class="middle">گذرواژه</label>
                            <input type="password" class="middle password pointer" placeholder="گذرواژه خود را وارد کنید.">
                            </div>

                            <div class="input-row">
                            <input type="submit" class="last signin pointer" id="last-input" value="ورود">
                            </div>
                     `;
              }

              else {
                     this.signupBtn.innerText = "حساب کاربری دارید؟ برای ورود کلیک کنید.";
                     this.forum.innerHTML = `                     
                            <div class="input-row">
                            <label for="name" class="first" id="first-label">نام</label>
                            <input type="text" class="first name pointer" id="first-input" placeholder="نام خود را وارد کنید.">
                            </div>

                            <div class="input-row">
                            <label for="lastname" class="middle">نام خانوادگی</label>
                            <input type="text" class="middle lastname pointer" placeholder="نام خانوادگی خود را وارد کنید.">
                            </div>

                            <div class="input-row">
                            <label for="phone-number" class="middle">شماره همراه</label>
                            <input type="tel" class="middle phone-number pointer" placeholder="شماره همراه خود را وارد کنید.">
                            </div>

                            <div class="input-row">
                            <label for="email" class="middle">ایمیل</label>
                            <input type="email" class="middle email pointer" placeholder="ایمیل خود را وارد کنید.">
                            </div>

                            <div class="input-row">
                            <label for="password" class="middle">گذرواژه</label>
                            <input type="password" class="middle password pointer" placeholder="گذرواژه خود را وارد کنید.">
                            </div>

                            <div class="input-row">
                            <input type="submit" class="last signup pointer" id="last-input" value="ثبت نام">
                            </div>
                     `;
              }
       }

       toggleForm() {
              const isLoginMode = this.signupBtn.id === "no_acc";
              this.signupBtn.id = isLoginMode ? "create_acc" : "no_acc";
              this.renderForm(isLoginMode);
       }

       renderProducts() {
              const grid = document.querySelector(".products");
              grid.innerHTML = "";
              products.forEach(p => {
                     const item = document.createElement("div");
                     item.className = "products__item";
                     item.innerHTML = `<h3>${p.name}</h3><p>${p.price.toLocaleString()} تومان</p><button class="products__item--${p.name}">انتخاب</button>`;
                     grid.appendChild(item);
              });
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

              return String(resualt);
       }
}

window.addEventListener("DOMContentLoaded", () => new Main());