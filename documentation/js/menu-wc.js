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
                    <a href="index.html" data-type="index-link">ecommerce_jiwoong documentation</a>
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
                                            'data-bs-target="#controllers-links-module-AppModule-864d2446d6c525fcdfc3c51cb8c3c1ddaf35428f11d6ae7e2349346b682a4d9588bb553efe238215d9c84355314f2ce2380ec5f005937d863d225f7ece42e3f9"' : 'data-bs-target="#xs-controllers-links-module-AppModule-864d2446d6c525fcdfc3c51cb8c3c1ddaf35428f11d6ae7e2349346b682a4d9588bb553efe238215d9c84355314f2ce2380ec5f005937d863d225f7ece42e3f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-864d2446d6c525fcdfc3c51cb8c3c1ddaf35428f11d6ae7e2349346b682a4d9588bb553efe238215d9c84355314f2ce2380ec5f005937d863d225f7ece42e3f9"' :
                                            'id="xs-controllers-links-module-AppModule-864d2446d6c525fcdfc3c51cb8c3c1ddaf35428f11d6ae7e2349346b682a4d9588bb553efe238215d9c84355314f2ce2380ec5f005937d863d225f7ece42e3f9"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-864d2446d6c525fcdfc3c51cb8c3c1ddaf35428f11d6ae7e2349346b682a4d9588bb553efe238215d9c84355314f2ce2380ec5f005937d863d225f7ece42e3f9"' : 'data-bs-target="#xs-injectables-links-module-AppModule-864d2446d6c525fcdfc3c51cb8c3c1ddaf35428f11d6ae7e2349346b682a4d9588bb553efe238215d9c84355314f2ce2380ec5f005937d863d225f7ece42e3f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-864d2446d6c525fcdfc3c51cb8c3c1ddaf35428f11d6ae7e2349346b682a4d9588bb553efe238215d9c84355314f2ce2380ec5f005937d863d225f7ece42e3f9"' :
                                        'id="xs-injectables-links-module-AppModule-864d2446d6c525fcdfc3c51cb8c3c1ddaf35428f11d6ae7e2349346b682a4d9588bb553efe238215d9c84355314f2ce2380ec5f005937d863d225f7ece42e3f9"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-5073e635f9f447674896b5074e05e0b85fb8c68445d4aee8c5010e2cb222c02ef6cafda381f47090e9f51e25cfbcc8c09c3e134b9625eea041a9a78007143239"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5073e635f9f447674896b5074e05e0b85fb8c68445d4aee8c5010e2cb222c02ef6cafda381f47090e9f51e25cfbcc8c09c3e134b9625eea041a9a78007143239"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5073e635f9f447674896b5074e05e0b85fb8c68445d4aee8c5010e2cb222c02ef6cafda381f47090e9f51e25cfbcc8c09c3e134b9625eea041a9a78007143239"' :
                                            'id="xs-controllers-links-module-AuthModule-5073e635f9f447674896b5074e05e0b85fb8c68445d4aee8c5010e2cb222c02ef6cafda381f47090e9f51e25cfbcc8c09c3e134b9625eea041a9a78007143239"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5073e635f9f447674896b5074e05e0b85fb8c68445d4aee8c5010e2cb222c02ef6cafda381f47090e9f51e25cfbcc8c09c3e134b9625eea041a9a78007143239"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5073e635f9f447674896b5074e05e0b85fb8c68445d4aee8c5010e2cb222c02ef6cafda381f47090e9f51e25cfbcc8c09c3e134b9625eea041a9a78007143239"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5073e635f9f447674896b5074e05e0b85fb8c68445d4aee8c5010e2cb222c02ef6cafda381f47090e9f51e25cfbcc8c09c3e134b9625eea041a9a78007143239"' :
                                        'id="xs-injectables-links-module-AuthModule-5073e635f9f447674896b5074e05e0b85fb8c68445d4aee8c5010e2cb222c02ef6cafda381f47090e9f51e25cfbcc8c09c3e134b9625eea041a9a78007143239"' }>
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
                                <a href="modules/ConsentModule.html" data-type="entity-link" >ConsentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ConsentModule-a4ec4cb8da7153e5d1570ec633b5ca96ba95ecfa6746080bcf058610fe90e4042445c3480b57331881a84d7882589d6422c88e9c9502691549e86e4fe2ffd8bd"' : 'data-bs-target="#xs-controllers-links-module-ConsentModule-a4ec4cb8da7153e5d1570ec633b5ca96ba95ecfa6746080bcf058610fe90e4042445c3480b57331881a84d7882589d6422c88e9c9502691549e86e4fe2ffd8bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConsentModule-a4ec4cb8da7153e5d1570ec633b5ca96ba95ecfa6746080bcf058610fe90e4042445c3480b57331881a84d7882589d6422c88e9c9502691549e86e4fe2ffd8bd"' :
                                            'id="xs-controllers-links-module-ConsentModule-a4ec4cb8da7153e5d1570ec633b5ca96ba95ecfa6746080bcf058610fe90e4042445c3480b57331881a84d7882589d6422c88e9c9502691549e86e4fe2ffd8bd"' }>
                                            <li class="link">
                                                <a href="controllers/ConsentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ConsentModule-a4ec4cb8da7153e5d1570ec633b5ca96ba95ecfa6746080bcf058610fe90e4042445c3480b57331881a84d7882589d6422c88e9c9502691549e86e4fe2ffd8bd"' : 'data-bs-target="#xs-injectables-links-module-ConsentModule-a4ec4cb8da7153e5d1570ec633b5ca96ba95ecfa6746080bcf058610fe90e4042445c3480b57331881a84d7882589d6422c88e9c9502691549e86e4fe2ffd8bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConsentModule-a4ec4cb8da7153e5d1570ec633b5ca96ba95ecfa6746080bcf058610fe90e4042445c3480b57331881a84d7882589d6422c88e9c9502691549e86e4fe2ffd8bd"' :
                                        'id="xs-injectables-links-module-ConsentModule-a4ec4cb8da7153e5d1570ec633b5ca96ba95ecfa6746080bcf058610fe90e4042445c3480b57331881a84d7882589d6422c88e9c9502691549e86e4fe2ffd8bd"' }>
                                        <li class="link">
                                            <a href="injectables/ConsentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmailModule-154712f7ecc180b16978e1bfbcd44a4dff45e6b84c32d58f85f98c8042af9ce15371ef68277faabd1348281df886101356081a38c728b760007965d0c0c5aca1"' : 'data-bs-target="#xs-injectables-links-module-EmailModule-154712f7ecc180b16978e1bfbcd44a4dff45e6b84c32d58f85f98c8042af9ce15371ef68277faabd1348281df886101356081a38c728b760007965d0c0c5aca1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-154712f7ecc180b16978e1bfbcd44a4dff45e6b84c32d58f85f98c8042af9ce15371ef68277faabd1348281df886101356081a38c728b760007965d0c0c5aca1"' :
                                        'id="xs-injectables-links-module-EmailModule-154712f7ecc180b16978e1bfbcd44a4dff45e6b84c32d58f85f98c8042af9ce15371ef68277faabd1348281df886101356081a38c728b760007965d0c0c5aca1"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MinioClientModule.html" data-type="entity-link" >MinioClientModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MinioClientModule-82d5381cd5d0fd1f69f2f1c76d89effe91d493ae5888dd59bd618366f9e1b38bef4bd1ebb576cd5fdf1681620acbda4f68646b49ec033217566616344e7ecf0e"' : 'data-bs-target="#xs-injectables-links-module-MinioClientModule-82d5381cd5d0fd1f69f2f1c76d89effe91d493ae5888dd59bd618366f9e1b38bef4bd1ebb576cd5fdf1681620acbda4f68646b49ec033217566616344e7ecf0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MinioClientModule-82d5381cd5d0fd1f69f2f1c76d89effe91d493ae5888dd59bd618366f9e1b38bef4bd1ebb576cd5fdf1681620acbda4f68646b49ec033217566616344e7ecf0e"' :
                                        'id="xs-injectables-links-module-MinioClientModule-82d5381cd5d0fd1f69f2f1c76d89effe91d493ae5888dd59bd618366f9e1b38bef4bd1ebb576cd5fdf1681620acbda4f68646b49ec033217566616344e7ecf0e"' }>
                                        <li class="link">
                                            <a href="injectables/MinioClientService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MinioClientService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrderModule-9d1efda5055064564d2a0eafd22ba4fe52f4a3e9470e59bc462825fc7517fd4058c608c0b1fb72d7b66a580a8b5b7d80c1675f744265ac66f948ae720393ddc0"' : 'data-bs-target="#xs-controllers-links-module-OrderModule-9d1efda5055064564d2a0eafd22ba4fe52f4a3e9470e59bc462825fc7517fd4058c608c0b1fb72d7b66a580a8b5b7d80c1675f744265ac66f948ae720393ddc0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-9d1efda5055064564d2a0eafd22ba4fe52f4a3e9470e59bc462825fc7517fd4058c608c0b1fb72d7b66a580a8b5b7d80c1675f744265ac66f948ae720393ddc0"' :
                                            'id="xs-controllers-links-module-OrderModule-9d1efda5055064564d2a0eafd22ba4fe52f4a3e9470e59bc462825fc7517fd4058c608c0b1fb72d7b66a580a8b5b7d80c1675f744265ac66f948ae720393ddc0"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrderModule-9d1efda5055064564d2a0eafd22ba4fe52f4a3e9470e59bc462825fc7517fd4058c608c0b1fb72d7b66a580a8b5b7d80c1675f744265ac66f948ae720393ddc0"' : 'data-bs-target="#xs-injectables-links-module-OrderModule-9d1efda5055064564d2a0eafd22ba4fe52f4a3e9470e59bc462825fc7517fd4058c608c0b1fb72d7b66a580a8b5b7d80c1675f744265ac66f948ae720393ddc0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-9d1efda5055064564d2a0eafd22ba4fe52f4a3e9470e59bc462825fc7517fd4058c608c0b1fb72d7b66a580a8b5b7d80c1675f744265ac66f948ae720393ddc0"' :
                                        'id="xs-injectables-links-module-OrderModule-9d1efda5055064564d2a0eafd22ba4fe52f4a3e9470e59bc462825fc7517fd4058c608c0b1fb72d7b66a580a8b5b7d80c1675f744265ac66f948ae720393ddc0"' }>
                                        <li class="link">
                                            <a href="injectables/OrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-281e65c9bc4e4d16c8e5e452fe32a4866d41fc7468d1d18d4e9fcdb3a9dd078ce77d4050a434cd9983d58721e4dd3e6d81418c3d97a6b4219146326a641e23b3"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-281e65c9bc4e4d16c8e5e452fe32a4866d41fc7468d1d18d4e9fcdb3a9dd078ce77d4050a434cd9983d58721e4dd3e6d81418c3d97a6b4219146326a641e23b3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-281e65c9bc4e4d16c8e5e452fe32a4866d41fc7468d1d18d4e9fcdb3a9dd078ce77d4050a434cd9983d58721e4dd3e6d81418c3d97a6b4219146326a641e23b3"' :
                                            'id="xs-controllers-links-module-ProductModule-281e65c9bc4e4d16c8e5e452fe32a4866d41fc7468d1d18d4e9fcdb3a9dd078ce77d4050a434cd9983d58721e4dd3e6d81418c3d97a6b4219146326a641e23b3"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-281e65c9bc4e4d16c8e5e452fe32a4866d41fc7468d1d18d4e9fcdb3a9dd078ce77d4050a434cd9983d58721e4dd3e6d81418c3d97a6b4219146326a641e23b3"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-281e65c9bc4e4d16c8e5e452fe32a4866d41fc7468d1d18d4e9fcdb3a9dd078ce77d4050a434cd9983d58721e4dd3e6d81418c3d97a6b4219146326a641e23b3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-281e65c9bc4e4d16c8e5e452fe32a4866d41fc7468d1d18d4e9fcdb3a9dd078ce77d4050a434cd9983d58721e4dd3e6d81418c3d97a6b4219146326a641e23b3"' :
                                        'id="xs-injectables-links-module-ProductModule-281e65c9bc4e4d16c8e5e452fe32a4866d41fc7468d1d18d4e9fcdb3a9dd078ce77d4050a434cd9983d58721e4dd3e6d81418c3d97a6b4219146326a641e23b3"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProfileModule-4e14c4fdad7fd8a7390db1a2b808c7490e32e39e659792dab90e7980899b0f3f38067f5736ad45bc8938e5468ac0b2ab13988e84e4ac95fa1108e7c9ff08ea7d"' : 'data-bs-target="#xs-controllers-links-module-ProfileModule-4e14c4fdad7fd8a7390db1a2b808c7490e32e39e659792dab90e7980899b0f3f38067f5736ad45bc8938e5468ac0b2ab13988e84e4ac95fa1108e7c9ff08ea7d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-4e14c4fdad7fd8a7390db1a2b808c7490e32e39e659792dab90e7980899b0f3f38067f5736ad45bc8938e5468ac0b2ab13988e84e4ac95fa1108e7c9ff08ea7d"' :
                                            'id="xs-controllers-links-module-ProfileModule-4e14c4fdad7fd8a7390db1a2b808c7490e32e39e659792dab90e7980899b0f3f38067f5736ad45bc8938e5468ac0b2ab13988e84e4ac95fa1108e7c9ff08ea7d"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProfileModule-4e14c4fdad7fd8a7390db1a2b808c7490e32e39e659792dab90e7980899b0f3f38067f5736ad45bc8938e5468ac0b2ab13988e84e4ac95fa1108e7c9ff08ea7d"' : 'data-bs-target="#xs-injectables-links-module-ProfileModule-4e14c4fdad7fd8a7390db1a2b808c7490e32e39e659792dab90e7980899b0f3f38067f5736ad45bc8938e5468ac0b2ab13988e84e4ac95fa1108e7c9ff08ea7d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-4e14c4fdad7fd8a7390db1a2b808c7490e32e39e659792dab90e7980899b0f3f38067f5736ad45bc8938e5468ac0b2ab13988e84e4ac95fa1108e7c9ff08ea7d"' :
                                        'id="xs-injectables-links-module-ProfileModule-4e14c4fdad7fd8a7390db1a2b808c7490e32e39e659792dab90e7980899b0f3f38067f5736ad45bc8938e5468ac0b2ab13988e84e4ac95fa1108e7c9ff08ea7d"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-40e819d66a16bde3a569dde8eb0ad20e7cbecc9e5f6982295a25a01f010ccf1a8e9310b2cb3f3277d8c1839233b1fbae661829ece5f8ac365adb84f57529316e"' : 'data-bs-target="#xs-controllers-links-module-UserModule-40e819d66a16bde3a569dde8eb0ad20e7cbecc9e5f6982295a25a01f010ccf1a8e9310b2cb3f3277d8c1839233b1fbae661829ece5f8ac365adb84f57529316e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-40e819d66a16bde3a569dde8eb0ad20e7cbecc9e5f6982295a25a01f010ccf1a8e9310b2cb3f3277d8c1839233b1fbae661829ece5f8ac365adb84f57529316e"' :
                                            'id="xs-controllers-links-module-UserModule-40e819d66a16bde3a569dde8eb0ad20e7cbecc9e5f6982295a25a01f010ccf1a8e9310b2cb3f3277d8c1839233b1fbae661829ece5f8ac365adb84f57529316e"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-40e819d66a16bde3a569dde8eb0ad20e7cbecc9e5f6982295a25a01f010ccf1a8e9310b2cb3f3277d8c1839233b1fbae661829ece5f8ac365adb84f57529316e"' : 'data-bs-target="#xs-injectables-links-module-UserModule-40e819d66a16bde3a569dde8eb0ad20e7cbecc9e5f6982295a25a01f010ccf1a8e9310b2cb3f3277d8c1839233b1fbae661829ece5f8ac365adb84f57529316e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-40e819d66a16bde3a569dde8eb0ad20e7cbecc9e5f6982295a25a01f010ccf1a8e9310b2cb3f3277d8c1839233b1fbae661829ece5f8ac365adb84f57529316e"' :
                                        'id="xs-injectables-links-module-UserModule-40e819d66a16bde3a569dde8eb0ad20e7cbecc9e5f6982295a25a01f010ccf1a8e9310b2cb3f3277d8c1839233b1fbae661829ece5f8ac365adb84f57529316e"' }>
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
                                    <a href="controllers/ConsentController.html" data-type="entity-link" >ConsentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrderController.html" data-type="entity-link" >OrderController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductController.html" data-type="entity-link" >ProductController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfileController.html" data-type="entity-link" >ProfileController</a>
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
                                    <a href="entities/Consent.html" data-type="entity-link" >Consent</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Profile.html" data-type="entity-link" >Profile</a>
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
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link" >ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateConsentDto.html" data-type="entity-link" >CreateConsentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileDto.html" data-type="entity-link" >CreateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailDto.html" data-type="entity-link" >EmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailVerificationDto.html" data-type="entity-link" >EmailVerificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageDto.html" data-type="entity-link" >PageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageMetaDto.html" data-type="entity-link" >PageMetaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageOptionsDto.html" data-type="entity-link" >PageOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateConsentDto.html" data-type="entity-link" >UpdateConsentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrderDto.html" data-type="entity-link" >UpdateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link" >UpdateProfileDto</a>
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
                                    <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" >AccessTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsentService.html" data-type="entity-link" >ConsentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link" >GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthStrategy.html" data-type="entity-link" >GoogleAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
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
                                    <a href="injectables/NaverAuthGuard.html" data-type="entity-link" >NaverAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NaverAuthStrategy.html" data-type="entity-link" >NaverAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderService.html" data-type="entity-link" >OrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
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
                                <a href="interfaces/BufferedFile.html" data-type="entity-link" >BufferedFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasFile.html" data-type="entity-link" >HasFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageMetaDtoParameters.html" data-type="entity-link" >PageMetaDtoParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithUser.html" data-type="entity-link" >RequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StoredFile.html" data-type="entity-link" >StoredFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StoredFileMetadata.html" data-type="entity-link" >StoredFileMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
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
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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