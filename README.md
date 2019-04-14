<h3 style="text-align: left;">This bot can help you to find any anime by screenshot.</h3>
<h1 style="text-align: center;">INSTRUCTION:</h1>
<p>
<h3>Installation: <br>
1) Create mysql table:  
CREATE TABLE `guilds` (<br>
  `guild_id` varchar(21) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,<br>
  `workchannel` varchar(18) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL<br>
)<br>
2) Install node.js,<br>
3) Edit config.json <b>(if you don't have trace.moe token set ""trace_moe_token": false)</b>,<br>
4) Start bot: cmd -> <b>node index.js</b><br>
5) Add bot to your server,<br>
6) Set work channel: <b>+setchannel #channel_name</b><br>
7) Send any anime image to work channel ;D<br>
</p>
<p><h3>How does it works?</h3>
Bot sends image to https://trace.moe/ and resend embeded reult to your work channel.
<p>
<p>
<h3>Why I can't find the search result?</h3>
Possible reasons:<br>
1. Your image is not an original anime screenshot.<br>
2. The anime has not been analyzed yet. <br>
3. Your image is flipped. <br>
4. Your image is of bad quality. <br>
Regarding 1. You may try to use <a href="https://saucenao.com/">SauceNAO</a> and <a href="https://iqdb.org/">iqdb.org</a> which is best for searching anime artwork.<br>
Regarding 2. New animes currently airing would be analyzed around 24 hours after TV broadcast. Long-running animes / cartoons are excluded at this stage. See "What animes are indexed" at the bottom of this page.<br>
As for 3. If you image comes from AMV / Anime Compilations, it's likely its flipped horizontally.<br>
As for 4. The image search algorithm is designed for almost-exact match, not similar match. It analyze the color layout of the image. So, when your image is not a full un-cropped original 16:9 screenshot (i.e. cropped image), the search would likely fail. <br>
Color is an important factor for the correct search, if heavy tints and filters are applied to the screenshot (i.e. grayscale, contrast, saturate, brightness, sepia), too much information are lost. In this case the search would also fail. The Edge Histogram can solve this issue by ignoring colors and only search edges. But I am running out of computing resource to support another image descriptor.<br>
Image transform is also an important factor. If the image is not scaled without maintaining original aspect ratios (i.e. elongated, flipped, rotated), the search would also fail.<br>
Text occupied too much of the image. Large texts on the image would interfere the original image. The system is not smart enough to ignore the text.<br>
If you image has too little distinguish features (e.g. dark images or images with large plain blocks of plain colors), the search would also fail.<br>
Searching with a real photo (of an anime) definitely won't work.<br>
</p>
<h3>Examples of bad screenshots</h3>
<br>
<h4>Extra border added</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/border-bad.jpg" style="max-width:320px;max-height:180px"><br>Bad Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/border-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<p style="clear:both">In case your screenshot has extra borders, please trim off the extra borders before you search.</p>
<br>
<h4>Cropped Image</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/cropped-bad.jpg" style="max-width:320px;max-height:180px"><br>Bad Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/cropped-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<p style="clear:both">Cropping the image would result a huge loss of information content. </p>
<br>
<h4>Flipped image</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/flipped-bad.jpg" style="max-width:320px;max-height:180px"><br>Bad Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/flipped-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<p style="clear:both">This screenshot from <a href="https://www.youtube.com/watch?v=TUoWYoTWcnA&feature=youtu.be&t=2m59s">AMV - Animegraphy 2015</a> flipped the original scene in the anime.</p>
<br>
<h4>Tinted images</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/tinted-bad.jpg" style="max-width:320px;max-height:180px"><br>Not a good Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/tinted-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<p style="clear:both">Tinted images are hard to search. Because the applied filter effects heavily distorted the information in the original screenshot. The color layout image descriptor can no longer find such images.</p>
<br>
<h4>Old Japanese Anime</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/old-bad.jpg" style="max-width:320px;max-height:180px"><br>Sample Screenshot</div>
<p style="clear:both">Anime of this age are not indexed.</p>
<br>
<h4>Not from Anime Screenshot</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/notanime-bad.jpg" style="max-width:320px;max-height:180px"><br>Sample Screenshot</div>
<p style="clear:both">You should try <a href="https://saucenao.com/">SauceNAO</a> and <a href="https://iqdb.org/">https://iqdb.org/</a> to search anime / doujin artwork.</p>
<br>
<h4>Not Japanese Anime</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/nonjapanese-bad.jpg" style="max-width:320px;max-height:180px"><br>Sample Screenshot</div>
<p style="clear:both">Tom and Jerry is obviously not a Japanese Anime.</p>
<br>
<h4>Dark image</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/dark-bad.jpg" style="max-width:320px;max-height:180px"><br>Sample Screenshot</div>
<p style="clear:both">Dark images are hard to distinguish using the colorlayout descriptor.</p>
<br>
<h4>Low resolution image</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/lowres-bad.jpg" style="max-width:320px;max-height:180px"><br>Sample Screenshot</div>
<p style="clear:both">Your image should be at least 320x180px to search effectively.</p>
<br>
<h3>Examples of acceptable screenshots</h3>
<h4>Slightly distorted size</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/distorted-bad.jpg" style="max-width:320px;max-height:180px"><br>Acceptable Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/distorted-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<p style="clear:both"></p>
<br>
<h4>Reasonably sized subtitles</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/subtitles-bad.jpg" style="max-width:320px;max-height:180px"><br>Acceptable Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/subtitles-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<p style="clear:both"></p>
<br>
<h4>A frame of GIF</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/gif-bad.jpg" style="max-width:320px;max-height:180px"><br>Acceptable Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/gif-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<p style="clear:both">If the color distortion is acceptable, GIF is also OK. </p>
<br>
<h4>Drawings of the anime scene</h4>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/draw-bad.jpg" style="max-width:320px;max-height:180px"><br>Acceptable Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/draw-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/draw2-bad.jpg" style="max-width:320px;max-height:180px"><br>Acceptable Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/draw2-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/draw3-bad.jpg" style="max-width:320px;max-height:180px"><br>Acceptable Screenshot</div>
<div style="float:left;text-align:center;border:1px #666 solid;width:320px"><img alt="" src="https://trace.moe//img/draw3-good.jpg" style="float:left;max-width:320px;max-height:180px"><br>Original Screenshot</div><br>
<p style="clear:both">The search image does not has to be taken from anime screencap directly. You can use drawings of some scenes as long as it is similar to the original one.</p>
<br>
<p>Info from trace.moe.</p>
