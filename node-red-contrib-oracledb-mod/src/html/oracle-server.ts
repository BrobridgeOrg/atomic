//to do: Node RED type definitions
declare var RED: any;

//
// -- oracle server --------------------------------------------------------------------------------
//
RED.nodes.registerType("oracle-server", {
    category: "config",
    defaults: {
        connectionname: { value: "", required: true },
        tnsname: { value: "" },
        connectiontype: { value: "Classic" },
        instantclientpath: { value: "/usr/lib/instantclient" },
        host: { value: "localhost", required: false },
        port: { value: 1521, required: false, validate: function(v) {
            return v == null || !!v.match(/^(\s*|\d+|null)$/);
        }},
        reconnect: {value: true},
        reconnecttimeout: { value: 5000, validate: RED.validators.number() },
        db: { value: "", required: false },
    },
    credentials: {
        user: {type: "text"},
        password: {type: "password"}
    },
    label: function() {
        return this.connectionname;
    },
    oneditprepare: function () {
        var tabs = RED.tabs.create({
            id: "node-config-oracle-server-tabs",
            onchange: function (tab) {
                $("#node-config-oracle-server-tabs-content").children().hide();
                $("#" + tab.id).show();
            }
        });
        $(".connection-type").hide();
        $("#node-config-input-connectiontype").on("change", function(evt){
            var ct = (<any> evt.currentTarget);
            if (ct.value === "TNS Name") {
                $("#wallet-container").show();
                $("#classic-container").hide();
                $("#node-config-input-host").val("");
                $("#node-config-input-port").val("");
                $("#node-config-input-db").val("");
            } else {
                $("#wallet-container").hide();
                $("#classic-container").show();
                $("#node-config-input-tnsname").val("");
            }
        }).trigger('change');
        tabs.addTab({
            id: "oracle-server-tab-connection",
            label: "Connection"
        });
        tabs.addTab({
            id: "oracle-server-tab-security",
            label: "Security"
        });
        setTimeout(function() { tabs.resize(); }, 0);

        // function updateTLSOptions() {
        //     if ($("#node-config-input-usetls").is(":checked")) {
        //         $("#node-config-input-verifyservercert").prop("disabled", false);
        //         $("#node-config-input-verifyservercert").next().css("color", "");
        //     } else {
        //         $("#node-config-input-verifyservercert").prop("disabled", true);
        //         $("#node-config-input-verifyservercert").next().css("color", "#aaa");
        //     }
        // }
        // updateTLSOptions();
        // $("#node-config-input-usetls").on("click", function () {
        //     updateTLSOptions();
        // });
    }
});
