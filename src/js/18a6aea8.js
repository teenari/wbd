/**
 * Copyright 2020 Teenari
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /**
 * Copyright 2020 Teenari
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let ifMobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);

class Menu {
    constructor(System, theme) {
        this.system = System;

        this.icons = {
            platforms: {
                benbot: {
                    PC: "https://benbotfn.tk/api/v1/exportAsset?path=FortniteGame/Content/UI/Friends_UI/Social/PC_PlatformIcon_64x.uasset",
                    CONSOLE: "https://benbotfn.tk/api/v1/exportAsset?path=FortniteGame/Content/UI/Friends_UI/Social/Console_PlatformIcon_64x.uasset",
                    EARTH: "https://benbotfn.tk/api/v1/exportAsset?path=FortniteGame/Content/UI/Friends_UI/Social/Earth_PlatformIcon_64x.uasset",
                    MOBILE: "https://benbotfn.tk/api/v1/exportAsset?path=FortniteGame/Content/UI/Friends_UI/Social/Mobile_PlatformIcon_64x.uasset",
                    XBL: "https://benbotfn.tk/api/v1/exportAsset?path=FortniteGame/Content/UI/Friends_UI/Social/xBox_PlatformIcon_64x.uasset",
                    PSN: "https://benbotfn.tk/api/v1/exportAsset?path=FortniteGame/Content/UI/Friends_UI/Social/PS4_w-backing_PlatformIcon_64x.uasset",
                    SWITCH: "https://benbotfn.tk/api/v1/exportAsset?path=FortniteGame/Content/UI/Friends_UI/Social/Switch_PlatformIcon_64x.uasset"
                }
            }
        };
        this.themes = {
            Default: {
                background: 'black&white',
                cosmetics: {
                    outfit: [
                        "CID_438_Athena_Commando_M_WinterGhoulEclipse",
                        "CID_439_Athena_Commando_F_SkullBriteEclipse",
                        "CID_437_Athena_Commando_F_AztecEclipse",
                        "CID_159_Athena_Commando_M_GumshoeDark"
                    ],
                    backpack: [
                        "BID_287_AztecFemaleEclipse",
                        "BID_286_WinterGhoulMaleEclipse"
                    ],
                    pickaxe: [
                        "Pickaxe_ID_164_DragonNinja"
                    ]
                }
            }
        }
        this.theme = this.themes[theme || 'Default'];
        this.LoadingText = null;
    }

    async changeMenu(menu, html) {
        menu[0].innerHTML = '<div class="cosmetic"><div style="width: 200px;height: 250px;align-items: center;display: inline-flex;position: relative;text-align: center;align-content: center;left: 50px;">LOADING</div></div>';
        await new Promise((resolve) => setTimeout(resolve, 100));
        menu[0].innerHTML = html;
        return menu;
    }

    async hideMenu(menu) {
        menu.fadeOut(250);
        await new Promise((resolve) => setTimeout(resolve, 250));
        menu.remove();
    }

    async showMenu(cosmeticType, menSu) {
        menSu.createMenu('cosmeticMenu');
        const menu = $('[id="MENU~cosmeticMenu"]');
        const id = menSu.system.items[cosmeticType.toLowerCase()].id;
        $(document).unbind('click');
        menu[0].innerHTML = `<div class="cosmetic">${cosmeticType}<br><div style="font-size: 20px; margin: 10px;">Select item by icon<div id="selectItem" class="clickHereButton">Click Here</div></div><div style="font-size: 20px; margin: 0px;">${id}</div><textarea placeholder="Item ID Here" id="cosmeticID"></textarea><div class="clickHereButton" id="SaveID" style="padding: 1px;font-size: 20px;">Save</div><div style="font-size: 20px; margin: 10px;">Select Variant by icon</div><div id="selectVariant" ${!Array.isArray(menSu.system.items[cosmeticType.toLowerCase()].variants) ? 'disabled' : ''} class="clickHereButton" style="font-size: 22px;margin: -2px;">${Array.isArray(menSu.system.items[cosmeticType.toLowerCase()].variants) ? 'Click Here' : 'Item does not have variant option'}</div></div>`;
        menu.fadeIn(250);
        await new Promise((resolve) => setTimeout(resolve, 250));
        $('#selectVariant').click(async () => {
            if(!menSu.system.items[cosmeticType.toLowerCase()].variants) return;
            let selectedVariants = [];
            await new Promise((resolve) => setTimeout(resolve, 1));
            await menSu.changeMenu(menu, `<div class="cosmetic">PICK YOUR VARIANT<div><textarea placeholder="Search Here" style="background: none;color: #322f3d;margin: 0px;width: 301px;height: 16px;resize: none;font-size: 20px;outline: none;border: none;overflow: hidden;font-family: sans-serif;text-align: center;position: relative;" id="search"></textarea></div><br><div id="cosmetics" style="overflow-y: scroll;width: 340px;height: 300px;"></div><div class="clickHereButton" id="SaveVariant" style="padding: 1px;font-size: 20px;">SAVE</div></div>`);
            menSu.addCloseButton(menu, 'MENU~cosmeticMenu~close');
            $('#search').keyup(() => {
                const searchQuery = $('#search').val().toUpperCase();
                for (const element of [...$('#cosmetics').children()].filter(e => !e.children[1].innerText.toUpperCase().startsWith(searchQuery))) {
                    element.hidden = true;
                }
                for (const element of [...$('#cosmetics').children()].filter(e => e.children[1].innerText.toUpperCase().startsWith(searchQuery))) {
                    element.hidden = false;
                }
            });
            for (const item of menSu.system.items[cosmeticType.toLowerCase()].variants) {
                for (const variant of item.options) {
                    const div = document.createElement("div");
                    div.id = `VARIANT/${variant.tag}#${variant.name}`;
                    const images = document.createElement("div");
                    for (const src of [{
                        src: variant.image
                    }]) {
                        const IMAGE = document.createElement("IMG");
                        if(src.src) IMAGE.width = 100;
                        if(src.src) IMAGE.height = 100;
                        IMAGE.draggable = false;
                        if(src.src) IMAGE.src = src.src;
                        images.appendChild(IMAGE);
                    }
                    div.appendChild(images);
                    const name = document.createElement("div");
                    name.innerHTML = variant.name;
                    div.appendChild(name);
                    div.onclick = async () => {
                        if(selectedVariants.find((e) => {
                            return e.image === variant.image;
                        })) {
                            selectedVariants = selectedVariants.filter((e) => {
                                return e.image !== variant.image;
                            });
                            $(`[id="VARIANT/${variant.tag}#${variant.name}"]`).children().eq(0).animate({borderRadius: 32}, 200);
                        }
                        else {
                            selectedVariants.push({channel: item.channel, tag: variant.tag, name: variant.name, image: variant.image});
                            $(`[id="VARIANT/${variant.tag}#${variant.name}"]`).children().eq(0).animate({borderRadius: 3}, 200);
                        }
                    }
                    $('#cosmetics')[0].appendChild(div);
                }
            }
            if(menSu.system.items.variants[cosmeticType.toLowerCase()]) for (const variant of menSu.system.items.variants[cosmeticType.toLowerCase()]) {
                $(`[id="VARIANT/${variant.tag}#${variant.name}"]`).children().eq(0).animate({borderRadius: 3}, 200)
                selectedVariants.push(variant);
            }
            $('#SaveVariant').click(async () => {
                if(selectedVariants.length === 0) return;
                if(!menSu.system.items.variants[cosmeticType.toLowerCase()]) menSu.system.items.variants[cosmeticType.toLowerCase()] = [];
                menSu.system.items.variants[cosmeticType.toLowerCase()] = selectedVariants;
                const img = $(`#${id}`)[0].children[0];
                if($(`#${id}`)[0].children[1].outerHTML.includes('opacity: 0.7')) $(`#${id}`)[0].children[1].remove();
                $(`#${id}`)[0].children[0].outerHTML += `<img width="${img.width}" height="${img.height}" draggable="false" src="${selectedVariants[selectedVariants.length - 1].image}" style="opacity: 0.7;left: -120px;">`;
                const variants = [];
                for (const variant of selectedVariants) {
                    variants.push({
                        "item": system.items[cosmeticType.toLowerCase()].type.backendValue,
                        "channel": variant.channel,
                        "variant": variant.tag
                    });
                }
                await menSu.hideMenu(menu);
                await menSu.system.changeVariants(cosmeticType.toLowerCase(), variants);
            });
        });
        $('#selectItem').click(async () => {
            let selectedItem;
            await new Promise((resolve) => setTimeout(resolve, 1));
            await menSu.changeMenu(menu, `<div class="cosmetic">PICK YOUR ${cosmeticType}<div><textarea placeholder="Search Here" style="background: none;color: #19181F;margin: 0px;width: 301px;height: 16px;resize: none;font-size: 20px;outline: none;border: none;overflow: hidden;font-family: sans-serif;text-align: center;position: relative;" id="search"></textarea></div><br><div id="cosmetics" style="overflow-y: scroll;width: 340px;height: 300px;"></div><div class="clickHereButton" id="SaveAvatar" style="padding: 1px;font-size: 21px;">SAVE</div></div>`);
            $('#search').keyup(() => {
                const searchQuery = $('#search').val().toUpperCase();
                for (const element of [...$('#cosmetics').children()].filter(e => !e.children[1].innerText.toUpperCase().startsWith(searchQuery))) {
                    element.hidden = true;
                }
                for (const element of [...$('#cosmetics').children()].filter(e => e.children[1].innerText.toUpperCase().startsWith(searchQuery))) {
                    element.hidden = false;
                }
            });
            for (const item of menSu.system.cosmetics.sorted[cosmeticType.toLowerCase()]) {
                const div = document.createElement("div");
                div.id = `ITEM/${item.id}`;
                const images = document.createElement("div");
                for (const src of [{
                    src: item.images.icon
                }]) {
                    const IMAGE = document.createElement("IMG");
                    if(src.src) IMAGE.width = 100;
                    if(src.src) IMAGE.height = 100;
                    IMAGE.draggable = false;
                    if(src.src) IMAGE.src = src.src;
                    images.appendChild(IMAGE);
                }
                div.appendChild(images);
                const name = document.createElement("div");
                name.innerHTML = item.name;
                div.appendChild(name);
                $('#cosmetics')[0].appendChild(div);
                $(`[id="ITEM/${item.id}"]`).hover(
                    () => {
                        $(`[id="ITEM/${item.id}"]`).animate({borderRadius: 3}, 200);
                    },
                    () => {
                        $(`[id="ITEM/${item.id}"]`).animate({borderRadius: 17}, 200);
                    }
                )
                $(`[id="ITEM/${item.id}"]`)[0].onclick = async (e) => {
                    if(selectedItem === item) return;
                    if(selectedItem && selectedItem !== item) {
                        $('#cosmetics').children().filter(function() {
                            return this.innerHTML.includes('border-radius: 3px');
                        }).children().filter(function() {
                            return this.outerHTML.includes('border-radius: 3px');
                        }).animate({borderRadius: 32}, 200);
                    }
                    $(`[id="ITEM/${item.id}"]`).children().eq(0).animate({borderRadius: 3}, 200);
                    selectedItem = item;
                };
            }
            $('#SaveAvatar').click(async () => {
               if(!selectedItem) return;
               await menSu.hideMenu(menu);
               await menSu.system.changeCosmeticItem(cosmeticType.toLowerCase(), selectedItem.id);
               await menSu.setItems();
            });
            menSu.addCloseButton(menu, 'MENU~cosmeticMenu~close');
        });
        $('#SaveID').click(async () => {
            if($('[id="cosmeticID"]').val().trim() === "" || !menSu.system.cosmetics.sorted[cosmeticType].find(e => e.id === $('[id="cosmeticID"]').val())) return;
            await menSu.hideMenu(menu);
            await menSu.system.changeCosmeticItem(cosmeticType.toLowerCase(), $('[id="cosmeticID"]').val());
            await menSu.setItems();
        });
        menu.draggable({
            "containment": "window"
        });
        menSu.addCloseButton(menu, 'MENU~cosmeticMenu~close');
    }

    createImage(item, top, left, position, width=100, height=100, right=null, id=null, noExtra=false, noExtras) {
        const IMAGES = [];
    
        for (const src of [
            ...noExtras ? [system.settings.colorScheme[system.settings.currentScheme].back] : [], item.images.icon, ...noExtras ? [system.settings.colorScheme[system.settings.currentScheme].faceplate] : []]) {
            const IMAGE = document.createElement("IMG");
            IMAGE.width = width;
            IMAGE.height = height;
            IMAGE.draggable = false;
            IMAGE.src = src;
            if(!noExtra) {
                if(position) IMAGE.style.position = position;
                if(top) IMAGE.style.top = `${top}px`;
                if(left) IMAGE.style.left = `${left}px`;
                if(right) IMAGE.style.left = `${right}px`;
                IMAGE.style.cursor = 'pointer';
            }
            if(id) IMAGE.id = item.id;
            IMAGES.push(IMAGE);
        }
    
        return IMAGES;
    }

    async createImageInElement(element, hidden, argumen, callback) {
        const html = this.createImage(...argumen);
        const div = document.createElement('div');
        div.id = argumen[0].id;
        div.hidden = hidden;
        div.innerHTML = '';
        div.classList.add('icon');
        element.appendChild(div);
        for (const IMAGE of html) {
            div.appendChild(IMAGE);
        }
        const text = document.createElement('div');
        div.appendChild(text);
        const showMenu = this.showMenu;
        const menu = this;
        div.onclick = callback || async function() {
            await showMenu(argumen[0].type.value.toUpperCase(), menu);
        }
        return div;
    }

    async showEmoteMenu() {
        this.createMenu('cosmeticMenu');
        const menu = $('[id="MENU~cosmeticMenu"]');
        $(document).unbind('click');
        menu[0].innerHTML = `<div class="cosmetic">EMOTE<br><div style="font-size: 20px; margin: 10px;">Select item by icon<div id="selectItem" class="clickHereButton">Click Here</div></div><div style="font-size: 20px; margin: 0px;">Emote ID</div><textarea placeholder="Item ID Here" id="cosmeticID"></textarea><div class="clickHereButton" id="SaveID" style="padding: 1px;font-size: 20px;">Save</div></div>`;
        menu.fadeIn(250);
        menu.draggable({
            "containment": "window"
        });
        $('#SaveID').click(async () => {
            await this.hideMenu(menu);
        });
        $('#selectItem').click(async () => {
            let selectedItem;
            await new Promise((resolve) => setTimeout(resolve, 1));
            await this.changeMenu(menu, `<div class="cosmetic">PICK YOUR EMOTE<div><div class="clickHereButton" style="padding: 1px;font-size: 25px;cursor: auto;height: auto;position: relative;top: 10px;"><textarea placeholder="Search Here" style="margin: 0px;width: 300px;height: 13px;resize: none;font-size: 20px;outline: none;border: none;overflow: hidden;font-family: t;position: relative;" id="search"></textarea></div><br><div id="cosmetics" style="overflow-y: scroll;width: 340px;height: 300px;"></div><div class="clickHereButton" id="SaveAvatar" style="padding: 1px;font-size: 20px;">EMOTE</div></div></div>`);
            $('#search').keyup(() => {
                const searchQuery = $('#search').val().toUpperCase();
                for (const element of [...$('#cosmetics').children()].filter(e => !e.children[1].innerText.toUpperCase().startsWith(searchQuery))) {
                    element.hidden = true;
                }
                for (const element of [...$('#cosmetics').children()].filter(e => e.children[1].innerText.toUpperCase().startsWith(searchQuery))) {
                    element.hidden = false;
                }
            });
            for (const item of this.system.cosmetics.sorted.emote) {
                const div = document.createElement("div");
                div.id = `ITEM/${item.id}`;
                const images = document.createElement("div");
                for (const src of [{
                    src: item.images.icon
                }]) {
                    const IMAGE = document.createElement("IMG");
                    if(src.src) IMAGE.width = 100;
                    if(src.src) IMAGE.height = 100;
                    IMAGE.draggable = false;
                    if(src.src) IMAGE.src = src.src;
                    images.appendChild(IMAGE);
                }
                div.appendChild(images);
                const name = document.createElement("div");
                name.innerHTML = item.name;
                div.appendChild(name);
                $('#cosmetics')[0].appendChild(div);
                $(`[id="ITEM/${item.id}"]`).hover(
                    () => {
                        $(`[id="ITEM/${item.id}"]`).animate({borderRadius: 3}, 200);
                    },
                    () => {
                        $(`[id="ITEM/${item.id}"]`).animate({borderRadius: 17}, 200);
                    }
                )
                $(`[id="ITEM/${item.id}"]`)[0].onclick = async (e) => {
                    if(selectedItem === item) return;
                    if(selectedItem && selectedItem !== item) {
                        $('#cosmetics').children().filter(function() {
                            return this.innerHTML.includes('border-radius: 3px');
                        }).children().filter(function() {
                            return this.outerHTML.includes('border-radius: 3px');
                        }).animate({borderRadius: 32}, 200);
                    }
                    $(`[id="ITEM/${item.id}"]`).children().eq(0).animate({borderRadius: 3}, 200);
                    selectedItem = item;
                };
            }
            $('#SaveAvatar').click(async () => {
                if(!selectedItem) return;
                await this.hideMenu(menu);
                await this.system.changeCosmeticItem('emote', selectedItem.id, true);
            });
            this.addCloseButton(menu, 'MENU~cosmeticMenu~close');
        });
        this.addCloseButton(menu, 'MENU~cosmeticMenu~close');
        return this;
    }

    async setItems() {
        $('#username').nextAll().remove();
        for (const key of Object.keys(this.system.items)) {
            const value = this.system.items[key];
            if(!value.type) continue;
            await this.createImageInElement(document.getElementById('fnItems'), false, [value, 0, 0, null, 120, 123, value.id, true, true]);
        }
        const buttons = document.createElement('div');
        document.getElementById('fnItems').appendChild(buttons);
        buttons.outerHTML = '<div class="smallButton"><div id="changeLevel">Change Level</div><div>0</div></div><div class="smallButton"><div id="emote" style="left: 32%;">Emote</div></div>';
        await new Promise((resolve) => setTimeout(resolve, 1));
        $('#changeLevel').click(async () => {
            const menu = this.createMenu('CHANGELEVEL');
            menu.innerHTML = `<div class="cosmetic" style="font-size: 23px;"><textarea placeholder="TYPE LEVEL HERE" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" dir="ltr"></textarea><div class="clickHereButton" id="SaveLevel" style="padding: 1px;font-size: 20px;">Save</div></div>`;
            $(document).click(async (e) => { 
                if(!$(event.target).closest('[id="MENU~CHANGELEVEL"]').length && $('[id="MENU~CHANGELEVEL"]').is(":visible")) {
                    await this.hideMenu($('[id="MENU~CHANGELEVEL"]'));
                    $(document).unbind('click');
                }
            });
        });
        $('#emote').click(async () => await system.menu.showEmoteMenu());
        return this;
    }

    async newNotification(type, text) {
        if($("#notification").css('display') !== 'none') {
            await new Promise((resolve) => {
                const inv = setInterval(() => {
                    if($("#notification").css('display') === 'none') {
                        resolve();
                        clearInterval(inv);
                    }
                });
            });
        }
        $("#notification").html(`<div>${type}</div><div>${text}</div>`).css('width', 0).css('padding', '22px').fadeIn().animate({
            width: '201px'
        }, 600);
        await new Promise((resolve) => setTimeout(resolve, 2600));
        return $("#notification").animate({
            width: '0px'
        }, 400).fadeOut();
    }

    addCloseButton(menu, id) {
        const div = document.createElement('div');
        div.classList.add('clickHereButton');
        div.setAttribute("style", "font-size: 18px; margin: 12px; position: relative; border-radius: 4px;");
        div.id = id;
        div.innerHTML = 'Close Menu';
        [...document.getElementById(menu[0].id).children].find(e => e.className === 'cosmetic').appendChild(div);
        $(`[id="${id}"]`).click(async () => await this.hideMenu(menu));
        return $(`[id="${id}"]`);
    }

    getImages(AthenaCosmeticLoadout) {
        const last = (character, data) => {
            return data.substring(data.lastIndexOf(character) + 1, data.length);
        }
        return {
            character: `https://fortnite-api.com/images/cosmetics/br/${last('.', AthenaCosmeticLoadout.characterDef).replace(/'/g, '')}/icon.png`,
            backpack: `https://fortnite-api.com/images/cosmetics/br/${last('.', AthenaCosmeticLoadout.backpackDef).replace(/'/g, '')}/icon.png`,
            pickaxe: `https://fortnite-api.com/images/cosmetics/br/${last('.', AthenaCosmeticLoadout.pickaxeDef).replace(/'/g, '')}/icon.png`
        };
    }

    reloadMembers() {
        const members = this.system.party.members;
        $('#members').empty();
        for (const member of members) {
            const images = this.getImages(member.meta['Default:AthenaCosmeticLoadout_j'].AthenaCosmeticLoadout);
            const div = document.createElement('div');
            document.getElementById('members').appendChild(div);
            div.outerHTML = `<div id="${member.id}" class="icon"><img width="120" height="120" draggable="false" src="${images.character}"><img width="30" height="30" draggable="false" src="${this.convertPlatform(member.meta['Default:Platform_j'].Platform.platformStr, true)}" style="left: 84px;top: 6px;background: black;border-radius: 9px;padding: 2px;border-color: white;"><div>${member.displayName}</div></div>`;
            const memberFunction = async () => {
                this.createMenu(`MEMBER${member.id}`);
                const menu = $(`[id="MENU~MEMBER${member.id}"]`);
                let items = '';
                for (const key of Object.keys(images)) {
                    const value = images[key];
                    items += `<div class="icon" style="width: 100px; height: 99px;background: #322f3d;"><img width="100" height="100" draggable="false" src="${value}"></div>`;
                }
                const menuPrefix = `MENU~MEMBER${member.id}~`;
                const textSIZE = ifMobile ? '110px' : '20px';
                const iconsDIV = ifMobile ? '<div style="font-size: 20px;align-items: center;position: relative;justify-content: center;display: flex;"><div style="align-content: end;align-items: center;text-align: center;display: flex;">' : '<div style="font-size: 20px; margin: 10px;"><div style="position: relative;align-content: end;align-items: self-end;height: 108px;display: flex;top: -8px;">';
                menu.html(`<div class="cosmetic">${member.displayName}<br>${iconsDIV}${items}</div>${this.system.party.members.find(m => m.id === this.system.account.id).role === 'CAPTAIN' && member.id !== this.system.account.id ? `<div style="display: flex;"><div id="${menuPrefix}kickPlayer" class="clickHereButton" style="${member.id === this.system.account.id ? 'border: 1px solid gray;color: gray;' : ''}padding: 4px;width: 97px;">Kick Player</div><div id="${menuPrefix}hiddenPlayer" class="clickHereButton" style="padding: 4px;width: 97px;position: absolute;left: 245px;">${this.system.hiddenMembers.find(m => m.id === member.id) ? 'Show Player' : 'Hide Player'}</div></div>` : ''}</div><div style="margin: 10px;font-size: ${textSIZE};">JOINED AT: ${member.joinedAt}</div><div style="margin: 10px;font-size: ${textSIZE};">ID: ${member.id}</div><div style="margin: 10px;font-size: ${textSIZE};">ROLE: ${member.role}</div></div>`);
                menu.fadeIn(250);
                $(`[id="${menuPrefix}kickPlayer"]`).click(async () => {
                    if(member.id === this.system.account.id || this.system.party.members.find(m => m.displayName === $("#username")[0].innerText).role !== 'CAPTAIN') return;
                    await this.hideMenu(menu);
                    await this.system.kickPlayer(member.id);
                });

                $(`[id="${menuPrefix}hiddenPlayer"]`).click(async () => {
                    if(member.id === this.system.account.id || this.system.party.members.find(m => m.displayName === $("#username")[0].innerText).role !== 'CAPTAIN') return;
                    await this.hideMenu(menu);
                    const f = this.system.hiddenMembers.find(m => m.id === member.id) ? 'showPlayer' : 'hidePlayer';
                    await this.system[f](member.id);
                });
                menu.draggable({
                    "containment": "window"
                });
                this.addCloseButton(menu, `MENU~MEMBER${member.id}~close`);
            };
            $(`#${member.id}.icon`).click(async () => {
                await memberFunction();
            });
            if(!this.system.party.meta['Default:RawSquadAssignments_j'].RawSquadAssignments.find(m => m.memberId === member.id) && !this.system.hiddenMembers.find(m => m.id === member.id)) {
                $(`#${member.id}.icon`).animate({opacity: 0.5}, 500);
                $(`#${member.id}.icon`)[0].innerHTML += '<div style="position: absolute;font-family: t;color: white;opacity: 0.8;top: 44px;">Player may be glitched.</div>';
            }
            if(!this.system.party.meta['Default:RawSquadAssignments_j'].RawSquadAssignments.find(m => m.memberId === member.id) && this.system.hiddenMembers.find(m => m.id === member.id)) {
                $(`#${member.id}.icon`).animate({opacity: 0.5}, 500);
            }
        }
        return this;
    }

    createMenu(purpose) {
        if(document.getElementById(`MENU~${purpose}`)) document.getElementById(`MENU~${purpose}`).remove();
        const menu = document.createElement('div');
        menu.classList.add('menu');
        menu.id = `MENU~${purpose}`;
        menu.hidden = true;
        document.getElementById('menus').appendChild(menu);
        return menu;
    }

    changeUsername(username) {
        $('#username').html(username);
        return this;
    }

    convertPlatform(platform, url) {
        let ENUMNAME;
        switch(platform) {
            case 'WIN': {
                ENUMNAME = 'PC';
            } break;
    
            case 'MAC': {
                ENUMNAME = 'PC';
            } break;
    
            case 'AND': {
                ENUMNAME = 'MOBILE';
            } break;
    
            case 'IOS': {
                ENUMNAME = 'MOBILE';
            } break;
    
            case 'AND': {
                ENUMNAME = 'MOBILE';
            } break;
    
            case 'SWT': {
                ENUMNAME = 'SWITCH';
            } break;
    
            default: {
                if(this.icons.platforms.benbot[platform]) {
                    ENUMNAME = platform;
                    break;
                }
                ENUMNAME = 'EARTH';
            } break;
        }
    
        return url ? this.icons.platforms.benbot[ENUMNAME] : ENUMNAME;
    }

    setLoadingText(text, doNot) {
        this.LoadingText = text;
        let dots = 0;
        $('#status').html(text);
        if(!doNot) {
            const inv = setInterval(() => {
                if(this.LoadingText !== text) clearInterval(inv);
                dots += 1;
                if(dots === 4) dots = 0;
                $('#status').html(text + '.'.repeat(dots));
            }, 500);
        }
        return this;
    }
}

class System {
    constructor ({
        url,
        theme,
        displayName
    }) {
        this.url = url || 'https://webfort.herokuapp.com';
        this.account = null;
        this.party = null;
        this.friends = null;
        this.hiddenMembers = null;
        this.source = null;
        this.user = null;
        this.auth = null;
        this.displayName = displayName;
        this.messages = {
            party: null,
            friends: null,
            handler: null
        };
        this.cosmetics = {
            sorted: null,
            variants: null
        };
        this.items = {
            variants: {}
        };
        this.eventHandler = async (data) => {
            const last = (character, data) => {
                return data.substring(data.lastIndexOf(character) + 1, data.length);
            }
            const json = JSON.parse(data.data);
            if(json.exit) return $('.message-container').fadeIn();
            if(json.event) {
                const data = json.data;
                const event = json.event;
                switch(event) {
                    case 'refresh:party': {
                        system.party = json.party;
                        this.menu.reloadMembers();
                        if(data.displayName && data.meta.schema && data.meta.schema['Default:FrontendEmote_j']) {
                            const emoteItemDef = JSON.parse(data.meta.schema['Default:FrontendEmote_j']).FrontendEmote.emoteItemDef;
                            if($(`#${data.id}.member`).children('img[type="emote"]')[0]) {
                                $(`#${data.id}.member`).children('img[type="emote"]')[0].remove();
                            }
                            if(emoteItemDef.trim() !== "" && emoteItemDef.trim() !== "None") {
                                const id = last('.', emoteItemDef).replace(/'/g, '');
                                const image = `https://fortnite-api.com/images/cosmetics/br/${id}/icon.png`;
                                $(`#${data.id}.icon`).children('img')[0].outerHTML += `<img style="opacity: 0.5" width="120" height="120" draggable="false" src="${image}">`;
                            }
                        }
                    } break;
    
                    case 'friend:message': {
                        if(!this.messages.friends[data.author.id]) this.messages.friends[data.author.id] = [];
                        this.messages.friends[data.author.id].push(data);
                        if(this.messages.handler) this.messages.handler(data);
                        await this.menu.newNotification('F', `You have a new message from ${data.author.displayName}`);
                    } break;

                    case 'party:member:joined': {
                        await this.menu.newNotification('P', `${data.displayName} has joined`);
                    } break;

                    case 'party:member:left': {
                        await this.menu.newNotification('P', `${data.displayName} has left`);
                    } break;

                    case 'party:member:kicked': {
                        await this.menu.newNotification('P', `${data.displayName} has been kicked`);
                    } break;
    
                    default: {
                        console.log(data);
                        console.log(`UNKNOWN EVENT ${event}`);
                    } break;
                }
            }
        };
        this.menu = new Menu(this, theme);
    }

    async authorize() {
        this.user = await this.getUser();
        this.auth = this.getAuthorizeCode();
        this.menu.setLoadingText('Logging out of last session');
        await this.logout();
        this.menu.setLoadingText('Creating new session');
        await this.createSession(this.displayName);
        this.menu.setLoadingText('Creating Event Source');
        this.source = await this.makeSource();
        window.onbeforeunload = async () => {
            await fetch(`${this.url}/api/account`, {
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': "https://teenari.github.io"
                },
                method: "DELETE"
            });
        };
        await new Promise((resolve) => {
            this.source.onmessage = (data) => {
                const json = JSON.parse(data.data);
                if(json.completed) return resolve();
                if(json.message) this.menu.setLoadingText(json.message);
            }
        });
        this.menu.setLoadingText('Setting Properties');
        await this.setProperties();
        this.menu.setLoadingText('Setting Source Events');
        this.setSourceEvent(this.source);
        this.menu.setLoadingText('Starting Menu');
        await this.startMenu();

        return this;
    }

    async startMenu() {
        this.menu.setLoadingText('Setting Username').changeUsername(this.account.displayName).setLoadingText('Loading Members').reloadMembers().setItems();
        $('#fortnite').fadeOut(300);
        $('.menu-container').css('left', '300vh').show().animate({left: '58.5px'}, 700);
        $('#avatar').css('position', 'absolute').css('left', '-500px').show().animate({left: 10}, 700);
        $('.members-container').fadeIn();
        $('.bar-container').fadeIn();
        $('.bar-emote').click(async () => await this.menu.showEmoteMenu());
        await new Promise((resolve) => setTimeout(resolve, 300));
        $('#DATA').fadeIn();
        $('#fortnite').css('padding', '0px');
        return this;
    }

    async logout() {
        this.account = null;
        this.party = null;
        this.friends = null;
        return await this.sendRequest('api/account', {
            method: "DELETE"
        });
    }

    async createSession(displayName) {
        return await this.sendRequest(`api/account?displayName=${displayName}`, {
            method: "POST"
        });
    }

    async changeCosmeticItem(type, id, setItem) {
        if(!setItem) this.items[type.toLowerCase()] = this.cosmetics.sorted[type.toLowerCase()].find(cosmetic => cosmetic.id === id);
        return await this.requestOperation('api/account/meta', 'cosmetic', {
            type,
            arguments: [id]
        }, null, 'PUT');
    }

    async changeVariants(type, variants) {
        this.items.variants[type] = variants;
        return await this.requestOperation('api/account/meta', 'cosmetic', {
            type,
            arguments: [this.items[type].id, variants]
        }, null, 'PUT');
    }

    async joinFriend(id) {
        return await this.requestOperation('api/account/party', 'join', {
            type: 'friend',
            id
        }, null, 'POST');
    }

    async makeSource() {
        return new EventSource(`${this.url}/api/account/authorize?auth=${this.auth}`);
    }

    async setProperties() {
        this.account = await this.getAccount();
        this.party = await this.getParty();
        this.friends = await this.getFriends();
        this.hiddenMembers = [];
        this.messages = {
            party: [],
            friends: {},
            handler: null
        }
        this.cosmetics.sorted = {};
        this.items.variants = [];
        await this.sortCosmetics();
        await this.setDefaultItems();
        return this;
    }

    async getAccount() {
        const response = await (await this.sendRequest('api/account')).json();
        if(response.authorization === false) return null;
        return response;
    }

    async getParty() {
        return await (await this.sendRequest('api/account/party')).json();
    }

    async getFriends() {
        return await (await this.sendRequest('api/account/friends')).json();
    }

    async getTimeLeft() {
        return await (await this.sendRequest('api/account/time')).json();
    }

    async requestOperation(path, operation, body, options={}, method="POST") {
        return await this.sendRequest(path, {
            method,
            body: JSON.stringify({
                operation,
                ...body
            }),
            headers: {
                'Content-type': 'application/json'
            },
            ...options
        });
    }

    async sendRequest(path, options, isURL) {
        if(this.url === 'https://webfort.herokuapp.com' || isURL) return await fetch(isURL ? path : `${this.url}/${path}`, {
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': "https://teenari.github.io"
            },
            ...options
        });
        else return await fetch(isURL ? path : `${this.url}/${path}`, {
            ...options,
            credentials: 'omit',
            headers: {
                'Set-Cookie': `auth=${this.user.id}`,
                ...options ? options.headers ? options.headers : {} : {}
            },
        });
    }

    async sortCosmetics() {
        const data = (await (await fetch('https://fortnite-api.com/v2/cosmetics/br')).json()).data;
        this.cosmetics.all = data;
        for (const value of data) {
            if(!this.cosmetics.sorted[value.type.value]) this.cosmetics.sorted[value.type.value] = [];
            this.cosmetics.sorted[value.type.value].push(value);
        }
        return this;
    }

    async setDefaultItems() {
        const check = (data, main) => {
            const t = main.find(e => e.id === data[(Math.floor(Math.random() * data.length - 1) + 1)]);
            if(!t) return check(data, main);
            return t;
        }
        const cosmetics = {
            outfit: [
                'CID_102_Athena_Commando_M_Raven',
                'CID_105_Athena_Commando_F_SpaceBlack',
                'CID_337_Athena_Commando_F_Celestial',
                'CID_175_Athena_Commando_M_Celestial',
                'ITEM/CID_413_Athena_Commando_M_StreetDemon',
                'CID_511_Athena_Commando_M_CubePaintWildCard',
                'CID_512_Athena_Commando_F_CubePaintRedKnight',
                'CID_513_Athena_Commando_M_CubePaintJonesy',
                'CID_850_Athena_Commando_F_SkullBriteCube',
                'CID_849_Athena_Commando_M_DarkEaglePurple',
                'CID_848_Athena_Commando_F_DarkNinjaPurple',
                'CID_737_Athena_Commando_F_DonutPlate',
                'CID_648_Athena_Commando_F_MsAlpine'
            ],
            backpack: [
                'BID_333_Reverb',
                'BID_338_StarWalker',
                'BID_343_CubeRedKnight',
                'BID_344_CubeWildCard'
            ],
            pickaxe: [
                'Pickaxe_ID_451_DarkEaglePurple'
            ]
        };
        for (const type of ['outfit', 'backpack', 'pickaxe']) {
            await this.changeCosmeticItem(type, check(cosmetics[type], this.cosmetics.sorted[type]).id);
        }
        return this;
    }

    async kickPlayer(id) {
        return await this.sendRequest(`api/account/party/kick?id=${id}`);
    }

    async hidePlayer(id) {
        $(`#${id}.icon`).animate({opacity: 0.5}, 300);
        this.hiddenMembers.push({id});
        return await this.requestOperation('api/account/party/member', 'hide', {
            id
        });
    }
    
    async showPlayer(id) {
        $(`#${id}.icon`).animate({opacity: 1}, 300);
        this.hiddenMembers = this.hiddenMembers.filter(m => m.id !== id);
        return await this.requestOperation('api/account/party/member', 'show', {
            id
        });
    }

    async createBot(repl, name, cid) {
        return await this.requestOperation('api/repl/account', 'create', {
            repl,
            name,
            cid
        });
    }

    async deleteBot(repl) {
        return await this.requestOperation('api/repl/account', 'delete', {
            repl
        });
    }

    async editBot(repl, name, cid, oldName) {
        return await this.requestOperation('api/repl/account', 'edit', {
            repl,
            name,
            old: {
                name: oldName
            },
            cid
        });
    }

    async getUser() {
        return await (await system.sendRequest('https://webfort.herokuapp.com/api/user', {}, true)).json();
    }

    setSourceEvent(source) {
        source.onmessage = this.eventHandler;
        return this;
    }

    getAuthorizeCode() {
        return this.user.id;
    }

    get members() {
        if(!this.party) return null;
        return this.party.members;
    }
}

const system = new System({
    theme: 'Default',
    eventHandler: console.log,
    messageHandler: console.log,
    displayName: ''
});

$(document).ready(async () => {
    if(ifMobile) {
        const link = document.createElement('link');  
        link.rel = 'stylesheet';  
        link.type = 'text/css'; 
        link.href = './src/css/mobile.css';  
        document.getElementsByTagName('HEAD')[0].appendChild(link);
    }
    const user = await (await fetch('https://webfort.herokuapp.com/api/user', {
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })).json();
    const outfitsW = (await (await fetch('https://fortnite-api.com/v2/cosmetics/br')).json()).data.filter(e => e.type.value === 'outfit');
    const outfits = outfitsW.slice(-50, outfitsW.length);
    if(user.authorization === false) {
        window.location = 'https://discord.com/api/oauth2/authorize?client_id=735921855340347412&redirect_uri=https%3A%2F%2Fwebfort.herokuapp.com%2Fapi%2Fauthorize&response_type=code&scope=identify';
    }
    const accountsNames = await (await fetch(`https://webfort.herokuapp.com/api/accounts`, {
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).catch((e) => {
        throw e;
    })).json();
    await new Promise((resolve) => setTimeout(resolve, 400));
    $('.loading-W').fadeOut(500);
    await new Promise((resolve) => setTimeout(resolve, 500));
    $('.notice').fadeIn();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    $('.notice-understand').fadeIn();
    await new Promise((resolve) => $('.notice-understand').click(resolve));
    $('.notice-understand').fadeOut(300);
    await new Promise((resolve) => setTimeout(resolve, 300));
    $('.loading-content')[0].innerHTML = '<div class="accounts-container"><div class="accounts"></div></div>';

    const cids = [
        'CID_102_Athena_Commando_M_Raven',
        'CID_105_Athena_Commando_F_SpaceBlack',
        'ITEM/CID_413_Athena_Commando_M_StreetDemon',
        'CID_511_Athena_Commando_M_CubePaintWildCard',
        'CID_512_Athena_Commando_F_CubePaintRedKnight',
        'CID_513_Athena_Commando_M_CubePaintJonesy',
        'CID_850_Athena_Commando_F_SkullBriteCube',
        'CID_849_Athena_Commando_M_DarkEaglePurple',
        'CID_737_Athena_Commando_F_DonutPlate',
        'CID_648_Athena_Commando_F_MsAlpine'
    ];
    const used = [];
    let displayName;
    const adjust = (color, amount) => '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));

    for (const accountO of accountsNames.accounts) {
        const account = accountO.name;
        const div = document.createElement('div');
        document.getElementsByClassName('accounts')[0].appendChild(div);
        const cid = cids.filter(e => !used.includes(e))[cids.filter(e => !used.includes(e)).length * Math.random() | 0];
        const src = `https://fortnite-api.com/images/cosmetics/br/${accountO.cid ? accountO.cid : cid}/icon.png`;
        const sadd = document.createElement('img');
        sadd.src = src;
        sadd.hidden = true;
        document.body.appendChild(sadd);
        $(`[src="${src}"]`).imgcolr(function (img, color) {
            const twofive = adjust(color, -25);
            const two = adjust(color, 20);
            sadd.remove();
            div.outerHTML = `<div id="${account}" class="account" style="background: ${two}; border-bottom: 6px solid ${color};"><div style="background: ${color}; color: ${two}"><img src="${src}"><div class="threedots" id="${account}buttonsmIW">⠇</div></div><div style="color: ${twofive};">${account}</div></div>`;
            $(`[id="${account}"]`).click((e) => {
                if(e.target.className === 'threedots') return;
                displayName = account;
            });
            $(`[id="${account}buttonsmIW"]`).click((e) => {
                let handler = $._data(document.getElementById(`${account}buttonsmIW`), 'events').click[0].handler;
                const selector = `[id="${account}"]`;
                $('.accounts').children(`[id!="${account}"]`).fadeOut();
                $(selector).css('cursor', 'auto').css('top', '').css('left', '').css('position', 'relative').css('width', '171px').css('height', '204px').animate({top: '4vh', left: '-1vh', width: '313px', height: '218px'}).children()[0].style.height = '154px';
                $(selector).off('click').children()[1].outerHTML = `<textarea spellcheck="false" style="color: ${$(`[id="${account}"]`).children().eq(0).css('background').split(' none')[0]};">${account}</textarea>`;
                $(selector).children()[0].children[0].outerHTML += `<div><div id="skin"><img src="https://fortnite-api.com/images/cosmetics/br/${accountO.cid ? accountO.cid : cid}/icon.png"></div><div id="done" style="width: 40px;color: ${$(`[id="${account}"]`).css('background').split(' none')[0]};height: 40px;top: -113px;left: 261px;line-height: 50px;font-size: 40px;">✔</div></div>`;
                $(selector).children().eq(0).children().eq(1).children().css('outline', `1px solid ${$(selector).css('background').split(' none')[0]}`);
                $(selector).children().eq(0).children().eq(1).children().hover(
                    () => $(selector).children().eq(0).children().eq(1).children().css({'boxShadow': `${$(selector).css('background').split(' none')[0]} 0px 0px 29px`}),
                    () => $(selector).children().eq(0).children().eq(1).children().css({'boxShadow': `none`})
                );
                $(selector).children().eq(0).children().eq(1).children().css('background', 'none');
                let outfitsHTML = '';
                let skin = '';
                let name = '';
                for (const outfit of outfits) {
                    outfitsHTML += `<div style="border: 1px solid ${$(selector).children().eq(0).css('background').includes(' none') ? $(selector).children().eq(0).css('background').split(' none')[0] : $(selector).children().eq(0).css('background')};"><img src="${outfit.images.icon}"></div>`;
                }
                $('#done').click(async () => {
                    if(!$(selector).children().eq(1).val()) return;
                    name = $(selector).children().eq(1).val();
                    $('[id="menu-create"]').remove();
                    await system.editBot(accountO.repl, name, skin || accountO.cid, accountO.name);
                    $('.accounts').children(`[id!="${account}"]`).fadeIn();
                    $(`[id="${account}"]`).children().eq(0).children('div').remove();
                    $(`[id="${account}"]`).children().eq(1)[0].outerHTML = `<div style="color: ${$(`[id="${account}"]`).children().eq(1).css('color')};">${name}</div>`;
                    $(`[id="${account}"]`).children().eq(0).css('height', '100px');
                    $(`[id="${account}"]`).children().eq(0).children().eq(0).after(`<div class="threedots" id="${account}buttonsmIW">⠇</div>`);
                    $(`[id="${account}buttonsmIW"]`).click(handler);
                    $(`[id="${account}"]`).css('cursor', 'pointer').css('height', '').css('top', '').css('left', '').css('width', '171px');
                    accountsNames.accounts.find(e => e.name === accountO.name && accountO.repl === accountO.repl).name;
                    $(`[id="${account}"]`).click((e) => {
                        if(e.target.className === 'threedots') return;
                        system.url = accountO.repl;
                        displayName = name;
                    });
                });
                $('#skin').click(async () => {
                    let html = `<div class="account" id="menu-create" type="skin" style="position: absolute;left: 116.667px;cursor: auto;top: 35.4844px;background: ${$(selector).css('background')};border-bottom: 3px solid ${$(selector).children().eq(0).css('background').includes(' none') ? $(selector).children().eq(0).css('background').split(' none')[0] : $(selector).children().eq(0).css('background').includes(' none')};"><div style="height: 101px;background: ${$(selector).children().eq(0).css('background')};"><img src="${$(selector).children()[0].children[0].src}"><div></div></div><div class="accounts-create-skins">${outfitsHTML}</div></div>`;
                    if($('[id="menu-create"]')[0] && $('[id="menu-create"]')[0].style.left === '312.667px') {
                        return $('[id="menu-create"]').animate({left: '116.667px'}, 100);
                    }
                    const functionimg = (img, color) => {
                        const c = adjust(color, -15);
                        $(selector).css('background', c).css('border-bottom', `6px solid ${color}`);
                        $(selector).children().eq(0).children().eq(1).children().css('outline', `1px solid ${c}`);
                        $('#text').css('color', c);
                        $(selector).children().eq(0).children().eq(1).children().hover(
                            () => $(selector).children().eq(0).children().eq(1).children().css({'boxShadow': `${c} 0px 0px 29px`}),
                            () => $(selector).children().eq(0).children().eq(1).children().css({'boxShadow': `none`})
                        );
                        $(selector).children().eq(0).children().eq(1).children().css({'color': c});
                        $(selector).children().eq(0).css('background', color);
                        $(selector).children().eq(1).css('color', adjust(color, 30));
                        $(selector).hover(
                            () => $(selector).css({'boxShadow': `${$(selector).children().eq(0).css('background').split(' none')[0]} 0px 0px 29px`}),
                            () => $(selector).css({'boxShadow': `none`})
                        );
                        $(selector).children().eq(0).children().eq(1).children().css('background', 'none');
                        outfitsHTML = '';
                        for (const outfit of outfits) {
                            outfitsHTML += `<div style="border: 1px solid ${color};"><img src="${outfit.images.icon}"></div>`;
                        }
                    }
                    if(!$('[id="menu-create"]')[0]) {
                        $(selector).before(html);
                        $(selector).children().eq(0).children().eq(1).children().eq(0).css('outline', `1px solid ${$(selector).css('background').split(' none')[0]}`);
                        $('[id="menu-create"]').hover(
                            () => $('[id="menu-create"]').css({'boxShadow': `${$(selector).children().eq(0).css('background').split(' none')[0]} 0px 0px 29px`}),
                            () => $('[id="menu-create"]').css({'boxShadow': `none`})
                        );
                        $('[type="skin"]').css('border-bottom', `3px solid ${$(selector).children().eq(0).css('background').includes(' none') ? $(selector).children().eq(0).css('background').split(' none')[0] : $(selector).children().eq(0).css('background')}`);
                        $('[class="accounts-create-skins"]').children().click((e) => {
                            const outfitID = e.target.src.split('https://fortnite-api.com/images/cosmetics/br/')[1].split('/')[0];
                            skin = outfitID;
                            $(`[src="${$(selector).children()[0].children[0].src}"]`).attr('src', e.target.src);
                            $('[id="menu-create"]').animate({left: '116.667px'}, 100);
                            $(`[src="${$(selector).children()[0].children[0].src}"]`).imgcolr(functionimg);
                        });
                        $('[id="menu-create"]').animate({left: '312.667px'}, 100);
                    }
                    else {
                        $('[id="menu-create"]').animate({left: '116.667px'}, 100);
                        await new Promise((resolve) => setTimeout(resolve, 100));
                        $('[id="menu-create"]')[0].outerHTML = html;
                        $('[id="menu-create"]').hover(
                            () => $('[id="menu-create"]').css({'boxShadow': `${$(selector).children().eq(0).css('background').split(' none')[0]} 0px 0px 29px`}),
                            () => $('[id="menu-create"]').css({'boxShadow': `none`})
                        );
                        $(selector).children().eq(0).children().eq(1).children().eq(0).css('outline', `1px solid ${$(selector).css('background').split(' none')[0]}`);
                        $('[type="skin"]').css('border-bottom', `3px solid ${$(selector).children().eq(0).css('background').includes(' none') ? $(selector).children().eq(0).css('background').split(' none')[0] : $(selector).children().eq(0).css('background')}`);
                        $('[class="accounts-create-skins"]').children().click((e) => {
                            const outfitID = e.target.src.split('https://fortnite-api.com/images/cosmetics/br/')[1].split('/')[0];
                            skin = outfitID;
                            $(`[src="${$(selector).children()[0].children[0].src}"]`).attr('src', e.target.src);
                            $('[id="menu-create"]').animate({left: '116.667px'}, 100);
                            $(`[src="${$(selector).children()[0].children[0].src}"]`).imgcolr(functionimg);
                        });
                        $('[id="menu-create"]').animate({left: '312.667px'}, 50);
                    }
                });
            });
            $(`[id="${account}"]`).hover(
                () => $(`[id="${account}"]`).css({'boxShadow': `${twofive} 0px 0px 29px`}),
                () => $(`[id="${account}"]`).css({'boxShadow': `none`})
            );
        });
        used.push(cid);
    };
    const div = document.createElement('div');
    document.getElementsByClassName('accounts')[0].appendChild(div);
    div.outerHTML = '<div id="CREATENEWACCOUNT" class="account"><div><img src="https://fortnite-api.com/images/cosmetics/br/CID_848_Athena_Commando_F_DarkNinjaPurple/icon.png"></div><div>CREATE</div></div>';
    $('#CREATENEWACCOUNT').click(async () => {
        $('.accounts').children(`[id!="CREATENEWACCOUNT"]`).fadeOut();
        $('#CREATENEWACCOUNT').css('cursor', 'auto').css('top', '').css('left', '').css('position', 'relative').css('width', '171px').css('height', '204px').animate({top: '4vh', left: '-1vh', width: '313px', height: '218px'}).children()[0].style.height = '154px';
        $('#CREATENEWACCOUNT').off('click').children()[1].outerHTML = '<textarea spellcheck="false">CREATE</textarea>';
        $('#CREATENEWACCOUNT').children()[0].children[0].outerHTML += '<div><div id="skin"><img src="https://fortnite-api.com/images/cosmetics/br/CID_848_Athena_Commando_F_DarkNinjaPurple/icon.png"></div><div id="done" style="width: 40px;color: #382C52;height: 40px;top: -113px;left: 261px;line-height: 50px;font-size: 40px;">✔</div></div>';
        let outfitsHTML = '';
        let skin = '';
        let name = '';
        for (const outfit of outfits) {
            outfitsHTML += `<div style="border: 1px solid ${$('#CREATENEWACCOUNT').children().eq(0).css('background').includes(' none') ? $('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0] : $('#CREATENEWACCOUNT').children().eq(0).css('background')};"><img src="${outfit.images.icon}"></div>`;
        }
        $('#done').click(async () => {
            if(!$('#CREATENEWACCOUNT').children().eq(1).val()) return;
            name = $('#CREATENEWACCOUNT').children().eq(1).val();
            $('[id="menu-create"]').fadeOut();
            $('#CREATENEWACCOUNT').html(`<div style="background: none;top: 35%;color: ${$('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0]};font-size: 33px;">Create a repl account.</div><div style="display: flex;align-items: center;justify-content: center;color: ${$('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0]}"><div style="font-size: 24px;border: 1px solid;border-radius: 10px;display: inline-block;padding: 10px; cursor: pointer;" id="signUpREPL">Sign Up</div></div>`);
            $('#signUpREPL').click(() => {
                window.open('https://repl.it/signup', '_blank', 'location=yes,height=500,width=500,scrollbars=yes,status=yes');
                $('#CREATENEWACCOUNT').html(`<div style="background: none;top: 35%;color: ${$('#CREATENEWACCOUNT').children().eq(0).css('color')};font-size: 30px;">Create a webfort api repo.</div><div style="display: flex;align-items: center;justify-content: center;color: ${$('#CREATENEWACCOUNT').children().eq(0).css('color')};"><div style="font-size: 24px;border: 1px solid;border-radius: 10px;display: inline-block;padding: 10px;cursor:pointer;" id="CreateAPI">Create</div></div>`);
                $('#CreateAPI').click(() => {
                    const rgb2hex = (r,g,b) => ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
                    const color = adjust(`#${rgb2hex(...Array.from($('#CREATENEWACCOUNT').children().eq(0).css('color').split('(')[1].split(')')[0].replace(/ /g, '').split(','), Number))}`, 30);
                    $('head').append(`<style id="placeholder">::placeholder {
                        color: ${color} !important;
                        opacity: 1;
                    }</style>`);
                    window.open('https://repl.it/@teenari/wbdapi', '_blank', 'location=yes,height=500,width=500,scrollbars=yes,status=yes');
                    $('#CREATENEWACCOUNT').html(`<div style="background: none;font-size: 19px;line-height: 157px;white-space: pre-wrap;color: ${$('#CREATENEWACCOUNT').children().eq(0).css('color')};font-size: 40px;">Paste API Url below.</div><textarea spellcheck="false" style="font-size: 38px;color: ${color};text-decoration: underline;top: 0px;" placeholder="URL HERE"></textarea><div style="display: flex;align-items: center;justify-content: center;color: ${$('#CREATENEWACCOUNT').children().eq(0).css('color')};top: -19px;position: relative;"><div style="font-size: 24px;border: 1px solid;border-radius: 10px;display: inline-block;padding: 10px;cursor: pointer;margin: 10px;color: ${$('#CREATENEWACCOUNT').children().eq(0).css('color')};" id="Done">CREATE</div></div>`);
                    $('#CREATENEWACCOUNT').css('width', '527px');
                    $('#Done').click(async () => {
                        if(!$('[placeholder="URL HERE"]').val()) return;
                        const request = await system.createBot($('[placeholder="URL HERE"]').val(), name, skin || 'CID_848_Athena_Commando_F_DarkNinjaPurple');
                        if(!request.ok) return;
                        system.url = $('[placeholder="URL HERE"]').val();
                        displayName = name;
                    });
                });
            });
        });
        $('#skin').click(async () => {
            let html = `<div class="account" id="menu-create" type="skin" style="position: absolute;left: 116.667px;cursor: auto;top: 35.4844px;background: ${$('#CREATENEWACCOUNT').css('background')};border-bottom: 3px solid ${$('#CREATENEWACCOUNT').children().eq(0).css('background').includes(' none') ? $('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0] : $('#CREATENEWACCOUNT').children().eq(0).css('background').includes(' none')};"><div style="height: 101px;background: ${$('#CREATENEWACCOUNT').children().eq(0).css('background')};"><img src="${$('#CREATENEWACCOUNT').children()[0].children[0].src}"><div></div></div><div class="accounts-create-skins">${outfitsHTML}</div></div>`;
            if($('[id="menu-create"]')[0] && $('[id="menu-create"]')[0].style.left === '312.667px') {
                return $('[id="menu-create"]').animate({left: '116.667px'}, 100);
            }
            const functionimg = (img, color) => {
                const c = adjust(color, -15);
                $('#CREATENEWACCOUNT').css('background', c).css('border-bottom', `6px solid ${color}`);
                $('#CREATENEWACCOUNT').children().eq(0).children().eq(1).children().css('outline', `1px solid ${c}`);
                $('#text').css('color', c);
                $('#CREATENEWACCOUNT').children().eq(0).children().eq(1).children().hover(
                    () => $('#CREATENEWACCOUNT').children().eq(0).children().eq(1).children().css({'boxShadow': `${c} 0px 0px 29px`}),
                    () => $('#CREATENEWACCOUNT').children().eq(0).children().eq(1).children().css({'boxShadow': `none`})
                );
                $('#CREATENEWACCOUNT').children().eq(0).children().eq(1).children().css({'color': c});
                $('#CREATENEWACCOUNT').children().eq(0).css('background', color);
                $('#CREATENEWACCOUNT').children().eq(1).css('color', adjust(color, 30));
                $('#CREATENEWACCOUNT').hover(
                    () => $('#CREATENEWACCOUNT').css({'boxShadow': `${$('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0]} 0px 0px 29px`}),
                    () => $('#CREATENEWACCOUNT').css({'boxShadow': `none`})
                );
                $('#CREATENEWACCOUNT').children().eq(0).children().eq(1).children().css('background', 'none');
                outfitsHTML = '';
                for (const outfit of outfits) {
                    outfitsHTML += `<div style="border: 1px solid ${color};"><img src="${outfit.images.icon}"></div>`;
                }
            }
            if(!$('[id="menu-create"]')[0]) {
                $('#CREATENEWACCOUNT').before(html);
                $('#CREATENEWACCOUNT').children().eq(0).children().eq(1).children().eq(0).css('outline', `1px solid ${$('#CREATENEWACCOUNT').css('background').split(' none')[0]}`);
                $('[id="menu-create"]').hover(
                    () => $('[id="menu-create"]').css({'boxShadow': `${$('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0]} 0px 0px 29px`}),
                    () => $('[id="menu-create"]').css({'boxShadow': `none`})
                );
                $('[type="skin"]').css('border-bottom', `3px solid ${$('#CREATENEWACCOUNT').children().eq(0).css('background').includes(' none') ? $('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0] : $('#CREATENEWACCOUNT').children().eq(0).css('background')}`);
                $('[class="accounts-create-skins"]').children().click((e) => {
                    const outfitID = e.target.src.split('https://fortnite-api.com/images/cosmetics/br/')[1].split('/')[0];
                    skin = outfitID;
                    $(`[src="${$('#CREATENEWACCOUNT').children()[0].children[0].src}"]`).attr('src', e.target.src);
                    $('[id="menu-create"]').animate({left: '116.667px'}, 100);
                    $(`[src="${$('#CREATENEWACCOUNT').children()[0].children[0].src}"]`).imgcolr(functionimg);
                });
                $('[id="menu-create"]').animate({left: '312.667px'}, 100);
            }
            else {
                $('[id="menu-create"]').animate({left: '116.667px'}, 100);
                await new Promise((resolve) => setTimeout(resolve, 100));
                $('[id="menu-create"]')[0].outerHTML = html;
                $('[id="menu-create"]').hover(
                    () => $('[id="menu-create"]').css({'boxShadow': `${$('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0]} 0px 0px 29px`}),
                    () => $('[id="menu-create"]').css({'boxShadow': `none`})
                );
                $('#CREATENEWACCOUNT').children().eq(0).children().eq(1).children().eq(0).css('outline', `1px solid ${$('#CREATENEWACCOUNT').css('background').split(' none')[0]}`);
                $('[type="skin"]').css('border-bottom', `3px solid ${$('#CREATENEWACCOUNT').children().eq(0).css('background').includes(' none') ? $('#CREATENEWACCOUNT').children().eq(0).css('background').split(' none')[0] : $('#CREATENEWACCOUNT').children().eq(0).css('background')}`);
                $('[class="accounts-create-skins"]').children().click((e) => {
                    const outfitID = e.target.src.split('https://fortnite-api.com/images/cosmetics/br/')[1].split('/')[0];
                    skin = outfitID;
                    $(`[src="${$('#CREATENEWACCOUNT').children()[0].children[0].src}"]`).attr('src', e.target.src);
                    $('[id="menu-create"]').animate({left: '116.667px'}, 100);
                    $(`[src="${$('#CREATENEWACCOUNT').children()[0].children[0].src}"]`).imgcolr(functionimg);
                });
                $('[id="menu-create"]').animate({left: '312.667px'}, 50);
            }
        });
    });
    await new Promise((resolve) => {
        const inv = setInterval(() => {
            if(displayName) {
                resolve();
                clearInterval(inv);
            }
        });
    });
    $('.loading').fadeOut(300);
    await new Promise((resolve) => setTimeout(resolve, 300));
    system.displayName = displayName;
    if(accountsNames.accounts.find(e => e.name === system.displayName && e.repl)) system.url = accountsNames.accounts.find(e => e.name === system.displayName && e.repl).repl;
    await system.authorize();
});