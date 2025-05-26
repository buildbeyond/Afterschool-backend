<?php
include('init.php');
switch($_SERVER['HTTP_HOST']){
  case 'mensdesignershoe.loc':
    $publicKey = '6LdKqOQZAAAAAOwQP78ZWLRFoCGJKPZnTDnfIcw2';
    break;
  
  case 'testing.mensdesignershow.com':
    $publicKey = '6LdtteQZAAAAAN-octhHRjBF8jcu01nswwlFymNl';
    break;
  
  // mensdesignershow.com
  default:
    $publicKey = '6LfHj-QZAAAAALNXGwnidoAXjMd4S8tCwGB9DLxb';
}
?>
<!doctype html>
<html lang="en">

<head>
  <title>Request Catalog | MensDesignerShoe.com</title>
  <meta name="description" content="MensDesignerShoe.com is your reliable source for luxury men's imported brand shoes and accessories. We offer a great selection at great prices. "/>
  <meta name="keywords" content="mens designer shoes, mens shoes, mens italian shoes, italian shoes, designer shoes, luxury shoes, mens luxury shoes"/>
  <?php require_once('head.php'); ?>
  <style type="text/css">
    @import url('//d3rxaij56vjege.cloudfront.net/pikaday/1.3.3/pikaday.css');
  </style>
</head>

<body>
	<!-- Google Tag Manager (noscript) -->

	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M4QG85M"

		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

		<!-- End Google Tag Manager (noscript) -->
<?php require_once('header2.php'); ?>
<section class="top-breadcrumb">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <ul class="breadcrumb">
          <li><a href="/">Home</a></li>
          <li class="active"><a href="#">Request a catalog</a></li>
        </ul>
        <div class="title">
          <h3>Request a catalog</h3>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="personal catalog">
  <div class="container">
    <div class="row">
      <div class="personal-title catalog-cnt">
        <h3>Get a free copy</h3>
        <p>We know that having the paper catalog in your hands is a beautiful experience and the popular digital 
          <br> formats today cannot replace that. If you would like to receive the printed
          <br>catalog and get it delivered to your mailbox, you can fill out our Catalog Request form below.
        </p>
      </div>
      <div class="catlog-mobile">
        <div id="myCarousel-mobile" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#myCarousel-mobile" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel-mobile" data-slide-to="1"></li>
            <li data-target="#myCarousel-mobile" data-slide-to="2"></li>
          </ol>
          <!-- Wrapper for slides -->
          <div class="carousel-inner">
            <div class="item active">
              <img src="/1images/catalog-6-1.jpg" alt="Shoe Catalog Cover" style="width:100%;">
            </div>
            <div class="item">
              <img src="/1images/catalog-6-2.jpg" alt="Catalog Page" style="width:100%;">
            </div>
            <div class="item">
              <img src="/1images/catalog-6-3.jpg" alt="Catalog Page" style="width:100%;">
            </div>
          </div>
          <div class="arrow-img">
            <!-- Left and right controls -->
            <a class="left carousel-control" href="#myCarousel-mobile" data-slide="prev">
              <!--<span class="glyphicon glyphicon-chevron-left"></span>-->
              <img class="left-arrow" src="/1images/black-left.jpg">
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel-mobile" data-slide="next">
              <!--<span class="glyphicon glyphicon-chevron-right"></span>-->
              <img class="right-arrow" src="/1images/black-right.jpg">
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <div class="personal-details catelogies">
        <div class="col-sm-6 cate-left">
          <div class="personal-left catlog-content-left">

            <form id="email_signup" class="request-shoe-catalog-form" action="//manage.kmail-lists.com/subscriptions/subscribe?a=RNVrr7&g=WWdJhV" data-ajax-submit="//manage.kmail-lists.com/ajax/subscriptions/subscribe" method="GET" target="_blank" novalidate="novalidate" data-google-captcha-public-key="<?php echo $publicKey;?>" data-is-validated="false">
              <input type="hidden" name="g" value="WWdJhV">
              <input type="hidden" name="$fields" value="Favorite Shoe Brand, Shoe Size, Shoe Width, Birthday"/>
              
              <div class="_form_element _x07751188 _full_width _clear">
                <div class="_form-title customer-info mail-box">
                  <h3> Catalog Request Form</h3>
                </div>
              </div>
              <div class="_form-content">
                <div class="register-from">
                  <div class="_form_element _x33914574 _full_width form-group col-sm-6">
                    <label class="_form-label">
                      First Name*
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="$first_name" placeholder="Type your first name" required="true"/>
                    </div>
                  </div>
                  <div class="_form_element _x74154179 _full_width form-group col-sm-6 pull-right">
                    <label class="_form-label">
                      Last Name*
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="$last_name" placeholder="Type your last name" required="true"/>
                    </div>
                  </div>
                  <div class="_form_element _x80900164 _full_width form-group col-sm-12">
                    <label class="_form-label">
                      Email*
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="email" placeholder="Type your email" required="true"/>
                    </div>
                  </div>
                  <div class="_form_element _field3 _full_width form-group col-sm-12">
                    <label class="_form-label">
                      Street Address*
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="$address1" value="" placeholder="Type your Street Address" required="true"/>
                    </div>
                  </div>
                  <div class="_form_element _field4 _full_width form-group col-sm-6">
                    <label class="_form-label">
                      City*
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="$city" value="" placeholder="Type your City" required="true"/>
                    </div>
                  </div>
                  <div class="_form_element _field5 _full_width form-group col-sm-6 pull-right">
                    <label class="_form-label">
                      State*
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="$region" value="" placeholder="Type your State" required="true"/>
                    </div>
                  </div>
                  <div class="_form_element _field6 _full_width form-group col-sm-6">
                    <label class="_form-label">
                      Zip Code*
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="$zip" value="" placeholder="Type your Zip Code" required="true"/>
                    </div>
                  </div>
                  <div class="_form_element _field7 _full_width form-group col-sm-6 pull-right">
                    <label class="_form-label">
                      Country*
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="$country" value="" placeholder="Type your Country" required="true"/>
                    </div>
                  </div>
                  <div class="_form_element _x27576953 _full_width form-group col-sm-12">
                    <label class="_form-label">
                      Phone
                    </label>
                    <div class="_field-wrapper">
                      <input type="text" name="$phone_number" placeholder="Type your phone number"/>
                    </div>
                  </div>
                  <div class="_form_element _field27 _full_width form-group col-sm-12">
                    <label class="_form-label">
                      Birthday
                    </label>
                    <div class="_field-wrapper">
                      <input type="date" class="date_field" name="Birthday" placeholder="Click to enter birthday"/>
                    </div>
                  </div>
                  <div class="_form_element _field18 _full_width form-group col-sm-12">
                    <label class="_form-label">
                      Favorite Shoe Brand
                    </label>
                    <div class="_field-wrapper">
                      <select name="Favorite Shoe Brand">
                        <option value="A. Testoni">
                          A. Testoni
                        </option>
                        <option value="Alan Payne">
                          Alan Payne
                        </option>
                        <option value="Bacco Bucci">
                          Bacco Bucci
                        </option>
                        <option value="Belvedere">
                          Belvedere
                        </option>
                        <option value="Calzoleria Toscana">
                          Calzoleria Toscana
                        </option>
                        <option value="Caporicci">
                          Caporicci
                        </option>
                        <option value="Donald Pliner">
                          Donald Pliner
                        </option>
                        <option value="Fennix">
                          Fennix
                        </option>
                        <option value="Ferrini">
                          Ferrini
                        </option>
                        <option value="John Lobb">
                          John Lobb
                        </option>
                        <option value="Jose Real">
                          Jose Real
                        </option>
                        <option value="Lloyd">
                          Lloyd
                        </option>
                        <option value="Los Altos">
                          Los Altos
                        </option>
                        <option value="Mauri">
                          Mauri
                        </option>
                        <option value="Mezlan">
                          Mezlan
                        </option>
                        <option value="Michael Toschi">
                          Michael Toschi
                        </option>
                        <option value="Moreschi">
                          Moreschi
                        </option>
                        <option value="Neil M">
                          Neil M
                        </option>
                        <option value="Nettleton">
                          Nettleton
                        </option>
                        <option value="Paul Parkman">
                          Paul Parkman
                        </option>
                        <option value="Santoni">
                          Santoni
                        </option>
                        <option value="Stemar">
                          Stemar
                        </option>
                        <option value="TB Phelps">
                          TB Phelps
                        </option>
                        <option value="Ugo Vasare">
                          Ugo Vasare
                        </option>
                        <option value="Zelli">
                          Zelli
                        </option>
                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="_form_element _field28 _full_width form-group col-sm-6 ">
                    <label class="_form-label">
                      Shoe Size (USA)
                    </label>
                    <div class="_field-wrapper">
                      <select name="Shoe Size">
                        <option selected>Select Shoe Size
                        </option>
                        <option value="5.5">
                          5.5
                        </option>
                        <option value="6">
                          6
                        </option>
                        <option value="6.5">
                          6.5
                        </option>
                        <option value="7">
                          7
                        </option>
                        <option value="7.5">
                          7.5
                        </option>
                        <option value="8">
                          8
                        </option>
                        <option value="8.5">
                          8.5
                        </option>
                        <option value="9">
                          9
                        </option>
                        <option value="9.5">
                          9.5
                        </option>
                        <option value="10">
                          10
                        </option>
                        <option value="10.5">
                          10.5
                        </option>
                        <option value="11">
                          11
                        </option>
                        <option value="11.5">
                          11.5
                        </option>
                        <option value="12">
                          12
                        </option>
                        <option value="13">
                          13
                        </option>
                        <option value="14">
                          14
                        </option>
                        <option value="15">
                          15
                        </option>
                        <option value="16">
                          16
                        </option>
                        <option value="17">
                          17
                        </option>
                        <option value="18">
                          18
                        </option>
                        <option value="19">
                          19
                        </option>
                        <option value="20">
                          20
                        </option>
                        <option value="21">
                          21
                        </option>
                        <option value="22">
                          22
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="_form_element _field29 _full_width form-group col-sm-6 pull-right ">
                    <label class="_form-label">
                      Shoe Width
                    </label>
                    <div class="_field-wrapper">
                      <select name="Shoe Width">
                        <option selected>Select Your Width
                        </option>
                        <option value="Medium">
                          Medium
                        </option>
                        <option value="Wide">
                          Wide
                        </option>
                        <option value="Narrow">
                          Narrow
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="_button-wrapper _full_width contact-mail">
                    <div class="klaviyo_form_actions">
                      <button id="_form_21_submit" class="_submit" type="submit">
                        Send catalog
                      </button>
                    </div>
                  </div>
                  <div class="_clear-element">
                  </div>
                </div>
              </div>
              <div class="klaviyo_messages">
                <div class="success_message" style="display:none;"></div>
                <div class="error_message" style="display:none;"></div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="personal-right">
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
              <!-- Indicators -->
              <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
              </ol>
              <!-- Wrapper for slides -->
              <div class="carousel-inner">
                <div class="item active">
                  <img src="/1images/catalog-6-1.jpg" alt="Shoe Catalog Cover" style="width:100%;">
                </div>
                <div class="item">
                  <img src="/1images/catalog-6-2.jpg" alt="Catalog Page" style="width:100%;">
                </div>
                <div class="item">
                  <img src="/1images/catalog-6-3.jpg" alt="Catalog Page" style="width:100%;">
                </div>
              </div>
              <!-- Left and right controls -->
              <div class="arrow-img">
                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                  <!--                      <span class="glyphicon glyphicon-chevron-left"></span> -->
                  <img class="left-arrow" src="/1images/black-left.jpg">
                  <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                  <!--  <span class="glyphicon glyphicon-chevron-right"></span> -->
                  <img class="right-arrow" src="/1images/black-right.jpg">
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</section>

<!-- sweetalert start -->
<script defer src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<!-- sweetalert end -->

<script type="text/javascript" src="//www.klaviyo.com/media/js/public/klaviyo_subscribe.js"></script>
<script type="text/javascript">
  // attach klaviyo
  KlaviyoSubscribe.attachToForms('#email_signup', {
    hide_form_on_success: true,
    success_message: "Thank you for requesting your catalog! We will get it in the mail to you shortly.",
  });
</script>
<script src="https://www.google.com/recaptcha/api.js?render=<?php echo $publicKey; ?>"></script>

<?php require_once('footer2.php'); ?>

</body>
</html>