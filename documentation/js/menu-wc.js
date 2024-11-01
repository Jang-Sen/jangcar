'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">jangcar documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-cb54c1f2c34d91dfffdc2f54c23dc1468a9ad417da22f6c0a2ad2e96b6037717f0d05fb00d8fa634ea2e74912e9156fdbc97a0888b2ba60d99a4e5451fb3a66a"' : 'data-bs-target="#xs-controllers-links-module-AppModule-cb54c1f2c34d91dfffdc2f54c23dc1468a9ad417da22f6c0a2ad2e96b6037717f0d05fb00d8fa634ea2e74912e9156fdbc97a0888b2ba60d99a4e5451fb3a66a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-cb54c1f2c34d91dfffdc2f54c23dc1468a9ad417da22f6c0a2ad2e96b6037717f0d05fb00d8fa634ea2e74912e9156fdbc97a0888b2ba60d99a4e5451fb3a66a"' :
                                            'id="xs-controllers-links-module-AppModule-cb54c1f2c34d91dfffdc2f54c23dc1468a9ad417da22f6c0a2ad2e96b6037717f0d05fb00d8fa634ea2e74912e9156fdbc97a0888b2ba60d99a4e5451fb3a66a"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-cb54c1f2c34d91dfffdc2f54c23dc1468a9ad417da22f6c0a2ad2e96b6037717f0d05fb00d8fa634ea2e74912e9156fdbc97a0888b2ba60d99a4e5451fb3a66a"' : 'data-bs-target="#xs-injectables-links-module-AppModule-cb54c1f2c34d91dfffdc2f54c23dc1468a9ad417da22f6c0a2ad2e96b6037717f0d05fb00d8fa634ea2e74912e9156fdbc97a0888b2ba60d99a4e5451fb3a66a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-cb54c1f2c34d91dfffdc2f54c23dc1468a9ad417da22f6c0a2ad2e96b6037717f0d05fb00d8fa634ea2e74912e9156fdbc97a0888b2ba60d99a4e5451fb3a66a"' :
                                        'id="xs-injectables-links-module-AppModule-cb54c1f2c34d91dfffdc2f54c23dc1468a9ad417da22f6c0a2ad2e96b6037717f0d05fb00d8fa634ea2e74912e9156fdbc97a0888b2ba60d99a4e5451fb3a66a"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-c17f5635fd86afaf92902650000a05d975174a98ec4f1dd605036559ca622add704b43dc36843ddd01a9e76994c5e472666b6456d9c102dee4b576b7fa6a87bd"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-c17f5635fd86afaf92902650000a05d975174a98ec4f1dd605036559ca622add704b43dc36843ddd01a9e76994c5e472666b6456d9c102dee4b576b7fa6a87bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c17f5635fd86afaf92902650000a05d975174a98ec4f1dd605036559ca622add704b43dc36843ddd01a9e76994c5e472666b6456d9c102dee4b576b7fa6a87bd"' :
                                            'id="xs-controllers-links-module-AuthModule-c17f5635fd86afaf92902650000a05d975174a98ec4f1dd605036559ca622add704b43dc36843ddd01a9e76994c5e472666b6456d9c102dee4b576b7fa6a87bd"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-c17f5635fd86afaf92902650000a05d975174a98ec4f1dd605036559ca622add704b43dc36843ddd01a9e76994c5e472666b6456d9c102dee4b576b7fa6a87bd"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-c17f5635fd86afaf92902650000a05d975174a98ec4f1dd605036559ca622add704b43dc36843ddd01a9e76994c5e472666b6456d9c102dee4b576b7fa6a87bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c17f5635fd86afaf92902650000a05d975174a98ec4f1dd605036559ca622add704b43dc36843ddd01a9e76994c5e472666b6456d9c102dee4b576b7fa6a87bd"' :
                                        'id="xs-injectables-links-module-AuthModule-c17f5635fd86afaf92902650000a05d975174a98ec4f1dd605036559ca622add704b43dc36843ddd01a9e76994c5e472666b6456d9c102dee4b576b7fa6a87bd"' }>
                                        <li class="link">
                                            <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/KakaoAuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KakaoAuthStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalAuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalAuthStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NaverAuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NaverAuthStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CarModule.html" data-type="entity-link" >CarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CarModule-080d4d8a1758cd7ac9b4390fa2f47768efbe9d7daf1b98552de094297815159d10c8b0200aa831d13628af6bd1ae2124a766d11fa7fc0b16a572881b73840d66"' : 'data-bs-target="#xs-controllers-links-module-CarModule-080d4d8a1758cd7ac9b4390fa2f47768efbe9d7daf1b98552de094297815159d10c8b0200aa831d13628af6bd1ae2124a766d11fa7fc0b16a572881b73840d66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CarModule-080d4d8a1758cd7ac9b4390fa2f47768efbe9d7daf1b98552de094297815159d10c8b0200aa831d13628af6bd1ae2124a766d11fa7fc0b16a572881b73840d66"' :
                                            'id="xs-controllers-links-module-CarModule-080d4d8a1758cd7ac9b4390fa2f47768efbe9d7daf1b98552de094297815159d10c8b0200aa831d13628af6bd1ae2124a766d11fa7fc0b16a572881b73840d66"' }>
                                            <li class="link">
                                                <a href="controllers/CarController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CarModule-080d4d8a1758cd7ac9b4390fa2f47768efbe9d7daf1b98552de094297815159d10c8b0200aa831d13628af6bd1ae2124a766d11fa7fc0b16a572881b73840d66"' : 'data-bs-target="#xs-injectables-links-module-CarModule-080d4d8a1758cd7ac9b4390fa2f47768efbe9d7daf1b98552de094297815159d10c8b0200aa831d13628af6bd1ae2124a766d11fa7fc0b16a572881b73840d66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CarModule-080d4d8a1758cd7ac9b4390fa2f47768efbe9d7daf1b98552de094297815159d10c8b0200aa831d13628af6bd1ae2124a766d11fa7fc0b16a572881b73840d66"' :
                                        'id="xs-injectables-links-module-CarModule-080d4d8a1758cd7ac9b4390fa2f47768efbe9d7daf1b98552de094297815159d10c8b0200aa831d13628af6bd1ae2124a766d11fa7fc0b16a572881b73840d66"' }>
                                        <li class="link">
                                            <a href="injectables/CarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DbModule.html" data-type="entity-link" >DbModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-ebe2f505962a4962fccf706544f23c5d2136b47625dd652934e7444c803ec9ea767ff0d8ff6d92ae5f31b58556d3debb0fd5130d02d6b1488918a71c02cc9c39"' : 'data-bs-target="#xs-injectables-links-module-MailModule-ebe2f505962a4962fccf706544f23c5d2136b47625dd652934e7444c803ec9ea767ff0d8ff6d92ae5f31b58556d3debb0fd5130d02d6b1488918a71c02cc9c39"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-ebe2f505962a4962fccf706544f23c5d2136b47625dd652934e7444c803ec9ea767ff0d8ff6d92ae5f31b58556d3debb0fd5130d02d6b1488918a71c02cc9c39"' :
                                        'id="xs-injectables-links-module-MailModule-ebe2f505962a4962fccf706544f23c5d2136b47625dd652934e7444c803ec9ea767ff0d8ff6d92ae5f31b58556d3debb0fd5130d02d6b1488918a71c02cc9c39"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TermModule.html" data-type="entity-link" >TermModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TermModule-03def91479a51f841ac477cdd66321a27eb11ef18e86c276ee6e3bfd9145539b3ccce39b45fd91a39ea237a34700e6c477c2e0bd22c55004e3b831f57d0e8dce"' : 'data-bs-target="#xs-controllers-links-module-TermModule-03def91479a51f841ac477cdd66321a27eb11ef18e86c276ee6e3bfd9145539b3ccce39b45fd91a39ea237a34700e6c477c2e0bd22c55004e3b831f57d0e8dce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TermModule-03def91479a51f841ac477cdd66321a27eb11ef18e86c276ee6e3bfd9145539b3ccce39b45fd91a39ea237a34700e6c477c2e0bd22c55004e3b831f57d0e8dce"' :
                                            'id="xs-controllers-links-module-TermModule-03def91479a51f841ac477cdd66321a27eb11ef18e86c276ee6e3bfd9145539b3ccce39b45fd91a39ea237a34700e6c477c2e0bd22c55004e3b831f57d0e8dce"' }>
                                            <li class="link">
                                                <a href="controllers/TermController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TermController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TermModule-03def91479a51f841ac477cdd66321a27eb11ef18e86c276ee6e3bfd9145539b3ccce39b45fd91a39ea237a34700e6c477c2e0bd22c55004e3b831f57d0e8dce"' : 'data-bs-target="#xs-injectables-links-module-TermModule-03def91479a51f841ac477cdd66321a27eb11ef18e86c276ee6e3bfd9145539b3ccce39b45fd91a39ea237a34700e6c477c2e0bd22c55004e3b831f57d0e8dce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TermModule-03def91479a51f841ac477cdd66321a27eb11ef18e86c276ee6e3bfd9145539b3ccce39b45fd91a39ea237a34700e6c477c2e0bd22c55004e3b831f57d0e8dce"' :
                                        'id="xs-injectables-links-module-TermModule-03def91479a51f841ac477cdd66321a27eb11ef18e86c276ee6e3bfd9145539b3ccce39b45fd91a39ea237a34700e6c477c2e0bd22c55004e3b831f57d0e8dce"' }>
                                        <li class="link">
                                            <a href="injectables/TermService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TermService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-c1d05d135c3d44f529025894a850a544c04d61a77ad4ece0eb3785d00e90e64fe0d14579cdb03d41c46be06ed9ba4060c164012b201822dbaded096cbf554a34"' : 'data-bs-target="#xs-controllers-links-module-UserModule-c1d05d135c3d44f529025894a850a544c04d61a77ad4ece0eb3785d00e90e64fe0d14579cdb03d41c46be06ed9ba4060c164012b201822dbaded096cbf554a34"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-c1d05d135c3d44f529025894a850a544c04d61a77ad4ece0eb3785d00e90e64fe0d14579cdb03d41c46be06ed9ba4060c164012b201822dbaded096cbf554a34"' :
                                            'id="xs-controllers-links-module-UserModule-c1d05d135c3d44f529025894a850a544c04d61a77ad4ece0eb3785d00e90e64fe0d14579cdb03d41c46be06ed9ba4060c164012b201822dbaded096cbf554a34"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-c1d05d135c3d44f529025894a850a544c04d61a77ad4ece0eb3785d00e90e64fe0d14579cdb03d41c46be06ed9ba4060c164012b201822dbaded096cbf554a34"' : 'data-bs-target="#xs-injectables-links-module-UserModule-c1d05d135c3d44f529025894a850a544c04d61a77ad4ece0eb3785d00e90e64fe0d14579cdb03d41c46be06ed9ba4060c164012b201822dbaded096cbf554a34"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-c1d05d135c3d44f529025894a850a544c04d61a77ad4ece0eb3785d00e90e64fe0d14579cdb03d41c46be06ed9ba4060c164012b201822dbaded096cbf554a34"' :
                                        'id="xs-injectables-links-module-UserModule-c1d05d135c3d44f529025894a850a544c04d61a77ad4ece0eb3785d00e90e64fe0d14579cdb03d41c46be06ed9ba4060c164012b201822dbaded096cbf554a34"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CarController.html" data-type="entity-link" >CarController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Car.html" data-type="entity-link" >Car</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Term.html" data-type="entity-link" >Term</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/Base.html" data-type="entity-link" >Base</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCarDto.html" data-type="entity-link" >CreateCarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTermDto.html" data-type="entity-link" >CreateTermDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCarDto.html" data-type="entity-link" >UpdateCarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTermDto.html" data-type="entity-link" >UpdateTermDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" >AccessTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarService.html" data-type="entity-link" >CarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link" >GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthStrategy.html" data-type="entity-link" >GoogleAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KakaoAuthGuard.html" data-type="entity-link" >KakaoAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KakaoAuthStrategy.html" data-type="entity-link" >KakaoAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthStrategy.html" data-type="entity-link" >LocalAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NaverAuthGuard.html" data-type="entity-link" >NaverAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NaverAuthStrategy.html" data-type="entity-link" >NaverAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/RequestUserInterface.html" data-type="entity-link" >RequestUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayloadInterface.html" data-type="entity-link" >TokenPayloadInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});