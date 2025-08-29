<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
        <div class="login-header">
            <img src="${url.resourcesPath}/img/logo.svg" alt="Logo" class="logo" />
            <h1 class="login-title">${msg("loginAccountTitle")}</h1>
        </div>
    <#elseif section = "form">
        <div id="kc-form">
            <div id="kc-form-wrapper">
                <#if realm.password>
                    <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post" class="login-form">
                        <div class="form-group">
                            <label for="username" class="form-label">
                                <#if !realm.loginWithEmailAllowed>
                                    ${msg("username")}
                                <#elseif !realm.registrationEmailAsUsername>
                                    ${msg("usernameOrEmail")}
                                <#else>
                                    ${msg("email")}
                                </#if>
                            </label>
                            <#if usernameEditDisabled??>
                                <input tabindex="1" id="username" class="form-input" name="username" value="${(login.username!'')}" type="text" disabled />
                            <#else>
                                <input tabindex="1" id="username" class="form-input ${messagesPerField.printIfExists('username','error')}" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" />
                            </#if>
                            <#if messagesPerField.existsError('username')>
                                <span class="error-message" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('username'))?no_esc}
                                </span>
                            </#if>
                        </div>

                        <div class="form-group">
                            <label for="password" class="form-label">${msg("password")}</label>
                            <input tabindex="2" id="password" class="form-input ${messagesPerField.printIfExists('password','error')}" name="password" type="password" autocomplete="off" />
                            <#if messagesPerField.existsError('password')>
                                <span class="error-message" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('password'))?no_esc}
                                </span>
                            </#if>
                        </div>

                        <div class="form-group form-actions">
                            <div id="kc-form-options">
                                <#if realm.rememberMe && !usernameEditDisabled??>
                                    <div class="checkbox">
                                        <label>
                                            <#if login.rememberMe??>
                                                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                            <#else>
                                                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                            </#if>
                                        </label>
                                    </div>
                                </#if>
                            </div>
                            <div id="kc-form-buttons">
                                <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                <input tabindex="4" class="btn btn-primary" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                            </div>
                        </div>

                        <#if realm.resetPasswordAllowed>
                            <div class="form-links">
                                <span><a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
                            </div>
                        </#if>
                    </form>
                </#if>
            </div>
        </div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span>${msg("noAccount")} <a tabindex="6" href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                </div>
            </div>
        </#if>
    </#if>
</@layout.registrationLayout>