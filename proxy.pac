/**
 * hosts.pac
 * @authors Complimentary
 * @date    
 * @update  
 */

// config (1: enabled | 0: disabled)
var config = {
	hosts: 1,
	blackList: 1,
	digitalDomain: 0 // block digitalDomain
};


// hosts
var hostsList = [
	{domain:'localhost', ip:'127.0.0.1:80'},
	
];

// blackList (url(keyword) or domain)
var blackList = [
	
	{domain:'googlesyndication.com'},
  {domain:'google-analytics.com'},
  {domain:'trackersimulator.org'},
  {domain:'ad-g.doubleclick.net'},
  {domain:'doubleclick.net'},
  {domain:'ad.doubleclick.net'},
  {domain:'googleads.g.doubleclick.net'},
  {domain:'pagead.googlesyndication.com'},
  {domain:'pagead1.googlesyndication.com'},
  {domain:'pagead2.googlesyndication.com'},
  {domain:'s.amazon-adsystem.com'},
  {domain:'aax-us-west.amazon-adsystem.com'},
  {domain:'aax-us-east.amazon-adsystem.com'},
  
	{domain:'ad.mo.doubleclick.net'}
];

// whiteList (root domain) for block digital domain
var whiteList = [
	'dvois.com'
  
];


function FindProxyForURL(url, host){
	var direct = 'DIRECT;';

	var proxy = '127.0.0.1:80';
	var block = '0.0.0.0:80';
	
	if(shExpMatch(host, '10.[0-9]+.[0-9]+.[0-9]+')) return direct;
	if(shExpMatch(host, '172.[0-9]+.[0-9]+.[0-9]+')) return direct;
	if(shExpMatch(host, '192.168.[0-9]+.[0-9]+')) return direct;
	if(shExpMatch(host, '127.0.0.1')) return direct;
	if(shExpMatch(host, 'localhost')) return direct;
	if(shExpMatch(host, 'dl.google.com')) return direct;

	if(config.blackList){
		// block by blackList
		for(i in blackList){
			if(blackList[i].url){
				// block by url(keyword)
				if(url.indexOf(blackList[i].url) > -1){
					return 'PROXY '+ block +';';
				};
			};
			if(blackList[i].domain){
				// block by domain
				if(shExpMatch(host, blackList[i].domain)){
					return 'PROXY '+ block +';';
				};
			};
		};
	};

	if(config.digitalDomain){
		// block by digital domain && bypass whiteList
		var reg = /^([^.]+\.)*(\d+)(\.[^.]+)$/gi;
		if(reg.exec(host) && whiteList.indexOf(RegExp.$2 + RegExp.$3) < 0){
			return 'PROXY '+ block +';';
		};
	};

	if(config.hosts){
		// proxy by hostsList
		for(i in hostsList){
			if(dnsDomainIs(host, hostsList[i].domain)){
				return 'PROXY '+ (hostsList[i].ip ? hostsList[i].ip : proxy) +';';
			};
		};
	};

	return direct;
}
