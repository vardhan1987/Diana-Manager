declare var $: any;


export class NotificationService {
    type = ['', 'info', 'success', 'warning', 'danger'];

    /**
     * from - top,bottom
     * align - right,left,center
     * message - actual message in the notification
     * type - warning,info,success,danger
     * @param from  
     * @param align 
     * @param message 
     * @param type 
     */
    showNotification(from, align, message,type) {
        

        //const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message

        }, {
                type,
                timer: 2000,
                placement: {
                    from: from,
                    align: align
                }
            });
    }


}