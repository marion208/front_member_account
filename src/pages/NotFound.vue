<template>
    <div class="error_page">
        <div class="error_content">
            <div class="sign_error">
                <div class="sub_sign_error">
                    <p>Wrong way</p>
                </div>
            </div>
            <h1>Erreur 404</h1>
            <p>On dirait que vous êtes perdu ...</p>
            <p>Que souhaitez-vous faire ?</p>
            <ul>
                <li><a href="/new_account" id="new_account_link">Créer un compte</a></li>
                <li><a href="/" id="connection_link">Connexion à un compte déjà existant</a></li>
                <li><a href="/profile" id="profile_link">Retourner sur mon profil</a></li>
            </ul>
        </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
.error_page {
    height: 100vh;
    width: 100vw;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}
.error_content {
    background-color: white;
    padding: 2em;
    border-radius: 1em;
    box-shadow: 0 0 50px black;
}
ul {
    list-style-type: none;
    padding: 0;
}
.sign_error {
    border: 1px solid black;
    display: flex;
    padding: 0.5em;
    text-transform: uppercase;
    font-size: 1.8em;
    border-radius: 0.8em;
}
.sub_sign_error {
    width: 100%;
    background-color: red;
    color: white;
    text-transform: uppercase;
    border-radius: 0.8em;
    font-family: "Noto-Bold";
}
</style>
