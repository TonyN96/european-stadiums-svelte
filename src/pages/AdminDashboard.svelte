<script>
    import { getContext, onMount } from "svelte";
    import { navBar, mainMenu } from "../stores";
    const stadiumService = getContext("StadiumService");

    navBar.set({
        bar: mainMenu,
    });

    let userList = [];

    onMount(async () => {
        userList = await stadiumService.findAllUsers();
    });
</script>

<div class="uk-container uk-margin ">
    <div class="uk-child-width-expand">
        <table class="uk-table uk-width-1-1">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>E-mail</th>
                    <th>Admin Status</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {#each userList as user}
                    <tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td
                            >{#if user.admin}Yes{:else}No{/if}</td
                        >
                        <td>
                            <div
                                class="uk-inline"
                                uk-toggle="target: #delete-user-{user._id}"
                                style="cursor: pointer; vertical-align: baseline;"
                            >
                                <i
                                    class="fas fa-times-circle"
                                    style="color: rgba(235, 38, 38, 0.829); font-size: 24px;"
                                    title="Delete"
                                    uk-tooltip
                                />
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

{#each userList as user}
    <div id="delete-user-{user._id}" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">Delete Account - {user.firstName} {user.lastName}</h2>
            <p>Are you sure you want to delete this account?</p>
            <p class="uk-text-center">
                <button class="uk-button uk-button-default uk-modal-close" type="button"
                    >Cancel</button
                >
                <a href="#/delete-user/{user._id}"
                    ><button
                        class="uk-button"
                        style="background-color: red; color: white;"
                        type="button">Delete</button
                    ></a
                >
            </p>
        </div>
    </div>
{/each}
