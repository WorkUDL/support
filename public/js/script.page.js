$(document).ready(function () {
	function t() {
		mask_phone.isValidNumber() ? i(mask_phone.getNumber()) : ($(".widget-text").addClass("widget-text-shake"), setTimeout(function () {
			$(".widget-text").removeClass("widget-text-shake")
		}, 500), $(".widget-text-input").focus())
	}

	function e() {
		var t;
		(t = $(".widget-text-input-mail").val(), /\S+@\S+\.\S+/.test(t)) ? i($(".widget-text-input-mail").val()): ($(".widget-text").addClass("widget-text-shake"), setTimeout(function () {
			$(".widget-text").removeClass("widget-text-shake")
		}, 500), $(".widget-text-input").focus())
	}

	function i(t) {
		$('.widget-text-input').blur();
		$('.widget-wheel').removeClass("widget-wheel-wait");

		let e = gift[Math.floor(Math.random() * gift.length)];

		$(".widget-wheel").css("animation-name", "anim-spin-" + e);
		$(".widget-page").hide();
        $(".widget-page-2").show();

        setTimeout(function () {
			$(".widget-page").hide();
			$(".widget-page-3").show();
			$(".widget-page-3 .widget-head").text($(".widget-wheel-text-" + e + " span").text())
		}, 6300);

        let queryDict = {}
        location.search
            .substr(1)
            .split("&")
            .forEach(function(item) {
                queryDict[item.split("=")[0]] = item.split("=")[1]
            })

        $.ajax('/api/widget/send', {
            method: 'post',
            data: {
                tracker: tracker,
                lead: t,
                gift: $(".widget-wheel-text-" + e + " span").text(),
                browser: $.pgwBrowser(),
                url: queryDict.url
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        }).then(() => {
            window.parent.postMessage("wlf_done", "*");
            ymtr > 0 && ym(ymtr, "reachGoal", "wlf_send")
        })
	}

	$('.widget-text-input-phone').length > 0 ? (mask_phone = window.intlTelInput($('.widget-text-input-phone')[0], {
		utilsScript: "/js/intlTelInput_utils.js",
		initialCountry: "ru",
		preferredCountries: ["ru", "ua", "by", "kz"]
	}), $('.widget-btn-1').click(function () {
		t()
	}), $('.widget-text-input-phone').on("keydown", function (e) {
		13 === e.keyCode && t()
	})) : $('.widget-text-input-mail').length > 0 && ($(".widget-btn-1").click(function () {
		e()
	}), $(".widget-text-input-phone").on("keydown", function (t) {
		13 === t.keyCode && e()
	})), $(".widget-btn-2").click(function () {
		window.parent.postMessage("wlf_close", "*")
	}), $('.widget-wheel').addClass("widget-wheel-wait"), ymtr > 0 && ym(ymtr, "reachGoal", "wlf_open")
});
