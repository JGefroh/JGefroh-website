---
layout: 'posts'
permalink: '/@jgefroh/a-guide-to-using-nginx-for-static-websites-d96a9d034940/'
title: 'A guide to using NGINX for static websites'
description: 'Learn how to host a static website using a VM and NGINX!'
---

<img src="{{ site.baseurl }}/images/posts/mac-screen.jpg" class="hero-1"/>

<h1>A guide to hosting static websites using NGINX</h1>
<h2>Learn how to host a static website using a VM and NGINX!</h2>

<p>
  <a href="https://www.nginx.com/">NGINX</a> is a very powerful web server. You can do a ton of things with it, such as setting up reverse proxies or load balancing. It can also be used to host your static website.
</p>

<p>
  Now, keep in mind that there are many options when it comes to hosting static websites nowdays — Github pages, any number of hosting providers, Amazon S3 or Cloudfront, Cloudflare, etc. This is just one option among many.
</p>

<div class="divider"></div>


<strong>This guide assumes some things:</strong>
<ul>
  <li>You're comfortable using Linux.</li>
  <li>You're trying to host a basic static website on a VM.</li>
  <li>You don't know how to use NGINX.</li>
</ul>

<div class="divider"></div>

<h3>Step 1: Get a server or a VM.</h3>
<p>
  You’ll need shell access to follow this guide. I recommend a $5/month droplet from DigitalOcean, but it doesn’t really matter where it is.
</p>

<h3>Step 2: Point your domain name to the new server</h3>
<p>
  Your domain name needs to point to your new server. Create an A record in your hosting provider’s DNS settings, pointing your domain name (eg. <code>jgefroh.com</code>) to the server IP address (eg. <code>127.0.0.1</code>). If you don’t want to wait for the DNS to propagate, edit your /etc/hosts file to point your domain to the right IP address.
</p>
<p>
  For the purposes of this guide, we’ll use the domain name <code>jgefroh.com</code> and the IP address <code>198.199.103.100</code> as examples. Switch out with your actual domain name and IP address as needed when you encounter these.
</p>


<h3>Step 3: Install NGINX</h3>
<code>ssh</code> into your server and use your favorite package manager to install NGINX. If using Ubuntu, you can run:

<pre>
  sudo apt-get update
  sudo apt-get install nginx
</pre>


<h3>Step 4: Move your website’s static files to the server</h3>
<p>
  You can’t deliver your website if the server doesn’t have your files, so let’s add your files to the server.
</p>

<p>
  By default, NGINX expects your static files to be in a specific directory (which varies). You can override this in the configuration. For now, let’s assume that you’ll be putting your website’s static files in the <code>/var/www/</code> directory.
</p>

<p>
  Create a directory in <code>/var/www/</code> called <code>jgefroh.com</code>. This is where your static website’s files will go.
</p>

<p>
  Copy your website’s static files into that folder. You can use the <code>scp</code> command from your local machine. <code>cd</code> into your website’s directory and run:
</p>

<pre>
  scp -r * root@198.199.103.100:/var/www/jgefroh.com
</pre>

<p>
  Be sure to replace the <code>198.199.103.100</code> and <code>jgefroh.com</code> with values appropriate to you.

  If you don’t have a website just yet, you can create a file called <code>index.html</code> with some “Coming soon” text as a placeholder.
</p>


<h3>Step 4: Configure NGINX to serve your website</h3>
<p>
  You’ll need to tell NGINX about your website and how to serve it.
</p>

<p>
  <code>cd</code> into <code>/etc/nginx/</code>. This is where the NGINX configuration files are located.
</p>

<p>The two directories we are interested are <code>sites-available</code> and <code>sites-enabled</code>.</p>

<ul>
  <li>
    <code>sites-available</code> contains individual configuration files for all of your possible static websites.
  </li>
  <li>
    <code>sites-enabled</code> contains links to the configuration files that NGINX will actually read and run.
  </li>
</ul>

<p>
  What we’re going to do is create a configuration file in <code>sites-available</code>, and then create a symbolic link (a pointer) to that file in <code>sites-enabled</code> to actually tell NGINX to run it.
</p>

<p>
  Create a file called <code>jgefroh.com</code> in the <code>sites-available</code> directory and add the following text to it:
</p>

<pre>
  server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/jgefroh.com;
    index index.html;
    server_name jgefroh.com www.jgefroh.com;
    location / {
      try_files $uri $uri/ =404;
    }
  }
</pre>

<p>
  Be sure to replace <code>jgefroh.com</code> with your actual domain name.
</p>

<p>
  This file tells NGINX several things:
</p>
<ul>
  <li>
    Deliver files from the folder <code>/var/www/jgefroh.com</code>
  </li>
  <li>
    The main index page is called <code>index.html</code>.
  </li>
  <li>
    Requests that are requesting <code>jgefroh.com</code> should be served by this <code>server</code> block.
  </li>
  <li>
    Note the <code>www</code> is also listed separately. This tells nginx to also route requests starting with <code>www</code> to the site. There’s actually nothing special about the <code>www</code> — it’s treated like any other subdomain.
  </li>
</ul>


<p>
  Now that the file is created, we’ll add it to the <code>sites-enabled</code> folder to tell NGINX to enable it. The syntax is as follows:
</p>

<pre>
  ln -s &#x3c;SOURCE_FILE> &#x3c;DESTINATION_FILE>
</pre>

<p>The actual syntax will look like:</p>

<pre>
  ln -s /etc/nginx/sites-available/jgefroh.com /etc/nginx/sites-enabled/jgefroh.com
</pre>

<p>
  Now, if you were to restart NGINX you should see your site!
</p>

<pre>
  sudo systemctl restart nginx
</pre>

<p>
  If it gives you an error, there’s likely a syntax error. You can stop here if you’d like, but you can also continue for some more optimization.
</p>


<div class="divider"></div>

<h3>Enable HTTPS</h3>
<p>
  With the advent of free SSL certs from <a href="https://letsencrypt.org/">LetsEncrypt</a>, there’s really no reason why you shouldn’t have HTTPS enabled for your website. In addition to the improved security, there’s significant performance opportunities it allows via HTTP/2 (browser vendors require encryption to enable this), you’ll increase user confidence, and you’ll even rank higher in SEO.
</p>

<h4>Step 1: Acquire an SSL cert</h4>
<p>
  There’s multiple ways to do this. You can buy a single-domain certification or a wildcard certification if you plan on securing subdomains.
</p>

<p>
  You can also go the free route via <a href="https://letsencrypt.org/">LetsEncrypt</a>:
</p>

<pre>
  sudo apt-get install software-properties-common
  sudo add-apt-repository ppa:certbot/certbot
  sudo apt-get update
  sudo apt-get install python-certbot-nginx
  sudo certbot --nginx certonly
</pre>

<p>
  Follow the instructions. This will install certs in <code>/etc/letsencrypt/live/jgefroh.com/</code>.
</p>

<h5>
  Enable auto-renewal for certificates:
</h5>

<p>
  Edit the <code>crontab</code> and create a CRON job to run the renewal command:
</p>

<pre>
  sudo crontab -e
</pre>

<p>
  Add the following line:
</p>

<pre>
  17 7 * * * certbot renew --post-hook "systemctl reload nginx"
</pre>

<h3>
  Step 2: Tell NGINX to use the SSL cert for your website
</h3>
<p>
  Once you’ve acquired your SSL certs, you’ll need to let NGINX know to use them.

  Let’s modify the configuration file we created for <code>jgefroh.com</code> to use SSL.

  Inside the <code>server</code> block we created, add the following text, changing the paths to point to wherever the certificate file and the key file are stored (usually store in the <code>/etc/nginx/certs/</code> directory):
</p>

<pre>
  server {
     # ...previous content here
     ssl on;
     ssl_certificate /etc/letsencrypt/live/jgefroh.com/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/jgefroh.com/privkey.pem;
  }
</pre>

<p>
  This tells nginx to enable SSL and use the specified key and certificate for that server.
</p>
<p>
  We also now face an issue: Port 80, what we’re currently listening to, is for HTTP connections. SSL connections use port 443. The solution? Change the port from 80 to 443.
</p>

<pre>
  server {
     listen 443 default_server;
     listen [::]:443 default_server;
     #... all other content
  }
</pre>


<p>
  This however, breaks people going to the website without <code>https://</code> explicitly in the URL. To fix this, we’ll redirect HTTP requests to the HTTPS url. Add the following new server block after the HTTPS (443) server block:
</p>

<pre>
  server {
         listen 0.0.0.0:80;
         server_name jgefroh.com www.jgefroh.com;
         rewrite ^ https://$host$request_uri? permanent;
  }
</pre>

<p>
  This will redirect all requests to <code>jgefroh.com</code> and <code>www.jgefroh.com</code> on port 80 to the HTTPS URL.
</p>

<p>
  Now, restart NGINX...
</p>

<pre>
  sudo systemctl restart nginx
</pre>

<p>
  …and you should have SSL enabled!
</p>

<p>
Test it by going to the four variations of your URL, eg.:
</p>
<ul>
  <li>http://jgefroh.com</li>
  <li>https://jgefroh.com</li>
  <li>http://www.jgefroh.com</li>
  <li>https://www.jgefroh.com</li>
</ul>

<p>
  They should all work and be secured via HTTPS.
</p>

<div class="divider"></div>


<h3>Improve performance</h3>
<h4>Enable HTTP/2</h4>
<p>
  HTTP/2 allows browsers to request files in parallel, greatly improving the speed of delivery. You’ll need HTTPS enabled. Edit your browser configuration file, adding <code>http2</code> to the <code>listen</code> directive, then restart NGINX:
</p>
<pre>
  server {
     listen 443 http2 default_server;
     listen [::]:443 http2 default_server;
     #... all other content
  }
</pre>

<h4>Enable gzip compression</h4>
<p>
gzip compression can greatly decrease the size of files during transmission (sometimes by over 80%).
</p>

<p>
  Add the following to your <code>server</code> block:
</p>

<pre>
  server {
     #...previous content
     gzip on;
     gzip_types application/javascript image/* text/css;
     gunzip on;
  }
</pre>

<p>
  This will ensure that javascript files, images, and CSS files are always compressed.
</p>

<blockquote class="sidequote">
  <strong>Warning:</strong>

  A <a href="https://en.wikipedia.org/wiki/CRIME">security vulnerability</a> exists when you enable gzip compression in conjunction with HTTPS that allows attackers to decrypt data. For static websites that don’t serve users sensitive data, this is less of an issue, but for any site serving sensitive information you should disable compression for those resources.
</blockquote>

<h4>Enable client-side caching</h4>
<p>
  Some files don’t ever change, or change rarely, so there’s no need to have users re-download the latest version. You can set cache control headers to provide hints to browsers to let them know what files they shouldn’t request again.
</p>
<pre>
  server {
     #...after the location / block
     location ~* \.(jpg|jpeg|png|gif|ico)$ {
         expires 30d;
      }
      location ~* \.(css|js)$ {
         expires 7d;
      }
  }
</pre>

<p>
  Examine how frequently your various file types change, and then set them to expire at appropriate times. If <code>.css</code> and <code>.js</code> files change regularly, you should set the expiration to be shorter. If image files like <code>.jpg</code> never change, you can set them to expire months from now.
</p>


<div class="divider"></div>

<h3>Dynamically route subdomains to folders</h3>
<p>
  If you have subdomains, chances are you don’t want to have to route every subdomain to the right folder. It’s a maintenance pain. Instead, create a wildcard server block for it, routing to the folder that matches the name:
</p>

<pre>
  server {
         server_name ~^(www\.)(?&#x3c;subdomain>.+).jgefroh.com$ ;
         root /var/www/jgefroh.com/$subdomain;
  }
  server {
          server_name ~^(?&#x3c;subdomain>.+).jgefroh.com$ ;
          root /var/www/jgefroh.com/$subdomain;
  }
</pre>

<p>
  Restart nginx, and you’ll automatically route subdomains to the same-named subfolder.
</p>
