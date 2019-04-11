//우암 (allinone)
pcs.fault = {
	"1" : "PCS Start Failure",					//PCS 시작 실패
	"2" : "Batt Over Voltage",					//배터리 과전압
	"3" : "Batt Over Current",					//배터리 과전류
	"4" : "Batt Under Voltage",					//배터리 부족 전압
	"5" : "DC CB1 Trip",						//
	"6" : "DC CB1A Fault",						//
	"7" : "DC Polarity Reversal",               //직류 극성 반전(통화로를 연결하는 a, b선의 전위가 가입자의 호 상태에 따라 반전되는 현상)
	"9" : "DC Side Abnormal",                   //직류 쪽 비정상
	"10" : "Inv. Over Voltage",                 //
	"11" : "Inv. Under Voltage",                //
	"12" : "Inv. Over Frequency",               //
	"13" : "Inv. Under Frequency",              //
	"14" : "Inv. Over Current",                 //
	"15" : "Inv. Phase Order Failure",          //
	"16" : "Inv. Phase Jump",                   //
	"17" : "Inv. Current Unbalance",            //
	"20" : "PEBB Over Temp",                    //
	"25" : "BMS 통신 에러",                        //
	"30" : "Grid Over Voltage Level1",          //
	"31" : "Grid Under Voltage Level1",         //
	"32" : "Grid Over Frequency Level1",        //
	"33" : "Grid Under Frequency Level1",       //
	"34" : "Grid CB3 Fault",                    //
	"40" : "MC1 Fault",                         //
	"43" : "TR Over Temp",                      //
	"45" : "NVSRAM Failure",                    //
	"46" : "ASYNC Failure",                     //
	"49" : "Emergency Stop",                    //
	"50" : "Fire Alam",                         //
	"51" : "Ground Fault Detection (DC)",       //
	"52" : "Parameter Error",                   //
	"56" : "Ground Fault Detection (AC)",       //
	"57" : "Grid Zero Voltage",                 //
	"59" : "LPMS E-STOP",                       //
	"60" : "Pebb Temp Unbalance"                //
}
pcs.warning = {
	"81" : "SOC Warning",                       //
	"82" : "Idle Warning",                      //
	"92" : "Temperature Derease mode ON",       //
	"95" : "SPD",                               //
	"120" : "Test Mode",                        //
	"125" : "Invalid Parameter"                 //
}
pcs.alarm = {
	"1" : "Heavy Fault",                        //
	"2" : "CB1(BATT CB)",                       //
	"3" : "CB1A(초기 충전)",                       //
	"5" : "MC1(Point of common coupling)",      //
	"6" : "CB3(GRID or LOAD CB - 수동 스위치)",    //
	"9" : "배터리측 고장",                          //
	"10" : "PCS 측 고장",                         //
	"11" : "GRID측 고장",                         //
	"31" : "SYSTEM 명령 상태"                      //
}
bms.fault = {
	"1" : "Over Charge Current Fault",           //
	"2" : "Over Discharge Current Fault",        //
	"3" : "Over Charge Power Limit Fault",       //
	"4" : "Over Discharge Power Limit Fault",    //
	"5" : "Over Voltage Fault",                  //
	"6" : "Under Voltage Fault",                 //
	"7" : "Over Voltage Difference Fault",       //
	"8" : "Over Temperature Fault",              //
	"9" : "Under Temperature Fault",             //
	"10" : "Over Temperature Difference Fault",  //
	"11" : "Comm. Error with the BBMS",          //
	"12" : "Comm. Error with MBMSs",             //
	"13" : "Current Sensing Error",              //
	"14" : "Temperature Sensing Error",          //
	"15" : "Rack Unbalancing Error",             //
	"16" : "Disconnect Switch Feedback Error",   //
	"17" : "Main Contactor Feedback Error",      //
	"18" : "Fan Feedback Error",                 //
	"19" : "MBMS OBD Error",                     //
	"20" : "Rack Connection Fault",              //
	"21" : "Initialzation Fault",                //
	"22" : "Constactor Open Fault"               //
}
bms.warning = {                                  //
	"1" : "Over Charge Current Warning",         //
	"2" : "Over Discharge Current Warning",      //
	"3" : "Over Charge Power Limit Warning",     //
	"4" : "Over Discharge Power Limit Warning",  //
	"5" : "Over Voltage Warning",                //
	"6" : "Under Voltage Warning",               //
	"7" : "Over Voltage Difference Warning",     //
	"8" : "Over Temperature Warning",            //
	"9" : "Under Temperature Warning",           //
	"10" : "Over Temperature Difference Warning" //
}
bms.alarm = {
	"1" : "Warning",                             //
	"2" : "Fault",                               //
	"3" : "Charge",                              //
	"4" : "Dischage",                            //
	"5" : "Online",                              //
	"6" : "High SOC Alarm",                      //
	"7" : "Low SOC Alarm",                       //
	"8" : "Cell Balancing",                      //
	"9" : "Every MBMS turned On",                //
	"10" : "Fan status",                         //
	"11" : "Module Fan feedback",                //
	"12" : "BPU Fan feedback",                   //
	"13" : "Precharge Contactor status",         //
	"14" : "Main Contactor + status",            //
	"15" : "Main Contactor + feedback",          //
	"16" : "Disconnect Switch(DS) feedback",     //
	"17" : "Main Contactor - status",            //
	"18" : "Main Contactor - feedback"           //
}
rack.alarm = {                                   //
	"1" : "Warning",                             //
	"2" : "Fault",                               //
	"3" : "Charge",                              //
	"4" : "Discharge",                           //
	"5" : "Online",                              //
	"6" : "High SOC Alarm",                      //
	"7" : "Low SOC Alarm",                       //
	"8" : "Cell Balancing",                      //
	"9" : "Every MBMS turned On",                //
	"10" : "Fan status",                         //
	"11" : "Module Fan feedback",                //
	"12" : "BPU Fan feedback",                   //
	"13" : "Precharge Contactor status",         //
	"14" : "Main Contactor + status",            //
	"15" : "Main Contactor + feedback",          //
	"16" : "Disconnect Switch(DS) feedback",     //
	"17" : "Main Contactor - status",            //
	"18" : "Main Contactor -Feedback"            //
}
rack.fault = {
	"1" : "Over Charge Current Fault",                  //
	"2" : "Over Discharge Current Fault",               //
	"3" : "Over Charge Power Limit Fault",              //
	"4" : "Over Discharge Power Limit Fault",           //
	"5" : "Over Cell Voltage Fault",                    //
	"6" : "Under Cell Voltage Fault",                   //
	"7" : "Over Cell Voltage Difference Fault",         //
	"8" : "Over Module Temperature Fault",              //
	"9" : "Under Module Temperature Fault",             //
	"10" : "Over Module Temperature Difference Fault",  //
	"11" : "Comm. Error with the BBMS",                 //
	"12" : "Comm. Error with MBMSs",                    //
	"13" : "Current Sensing Error",                     //
	"14" : "Temperature Sensing Error",                 //
	"15" : "Rack Unbalancing Error",                    //
	"16" : "Disconnect Switch Feedback Error",          //
	"17" : "Main Contactor Feedback Error",             //
	"18" : "Fan Feedback Error",                        //
	"19" : "MBMS OBD Error",                            //
	"20" : "Rack Connection Fault",                     //
	"21" : "Initialzation Fault",                       //
	"22" : "Constactor Open Fault"                      //
}
rack.warning = {
	"1" : "Over Charge Current Warning",                //
	"2" : "Over Discharge Current Warning",             //
	"3" : "Over Charge Power Limit Warning",            //
	"4" : "Over Discharge Power Limit Warning",         //
	"5" : "Over Cell Voltage Warning",                  //
	"6" : "Under Cell Voltage Warning",                 //
	"7" : "Over Cell Voltage Difference Warning",       //
	"8" : "Over Module Temperature Warning",            //
	"9" : "Under Module Temperature Warning",           //
	"10" : "Over Module Temperature Difference Warning" //
}

//도로교통연구원
pcs.fault = {
	"1" : "PCS Start Failure",                          //
	"2" : "Batt Over Voltage",                          //
	"3" : "Batt Over Current",                          //
	"4" : "Batt Under Voltage",                         //
	"5" : "DC CB1 Trip",                                //
	"6" : "DC CB1A Fault",                              //
	"7" : "DC Polarity Reversal",                       //
	"9" : "DC Side Abnormal",                           //
	"10" : "Inv. Over Voltage",                         //
	"11" : "Inv. Under Voltage",                        //
	"12" : "Inv. Over Frequency",                       //
	"13" : "Inv. Under Frequency",                      //
	"14" : "Inv. Over Current",                         //
	"15" : "Inv. Phase Order Failure",                  //
	"16" : "Inv. Phase Jump",                           //
	"17" : "Inv. Current Unbalance",                    //
	"18" : "Battery Current Sensor Abnormal",           //
	"19" : "PEBB Over Current",                         //
	"20" : "PEBB Over Temp",                            //
	"21" : "PEBB FAN Fault",                            //
	"22" : "PEBB Fuse Fault",                           //
	"23" : "PEBB IGBT Fault",                           //
	"24" : "PEBB MC Fault",                             //
	"25" : "BMS 통신 에러",                                //
	"26" : "LPMS 통신 에러",                               //
	"29" : "CB2 Fault",                                 //
	"30" : "Grid Over Voltage Level1",                  //
	"31" : "Grid Under Voltage Level1",                 //
	"32" : "Grid Over Frequency Level1",                //
	"33" : "Grid Under Frequency Level1",               //
	"34" : "Grid CB3 Fault",                            //
	"35" : "Grid Over Voltage Level2",                  //
	"36" : "Grid Under Voltage Level2",                 //
	"37" : "Grid Over Frequency Level2",                //
	"38" : "Grid Under Frequency Level2",               //
	"39" : "MC3 Fault",                                 //
	"40" : "MC4 Fault",                                 //
	"41" : "MC5 Fault",                                 //
	"42" : "MC6 Fault",                                 //
	"43" : "TR Over Temp",                              //
	"45" : "NVSRAM Failure",                            //
	"46" : "ASYNC Failure",                             //
	"47" : "CAN Failure",                               //
	"48" : "Islanding Abnormal",                        //
	"49" : "Emergency Stop",                            //
	"50" : "Fire Alam",                                 //
	"51" : "Ground Fault Detection (DC)",               //
	"52" : "Parameter Error",                           //
	"53" : "PCS 판넬 도어 개방",                            //
	"56" : "Ground Fault Detection (AC)",               //
	"57" : "Grid Zero Voltage",                         //
	"59" : "LPMS E-STOP",                               //
	"60" : "Pebb Temp Unbalance"                        //
}
pcs.warning = {
	"81" : "SOC Warning",                               //
	"82" : "Idle Warning",                              //
	"92" : "Temperature Derease mode ON",               //
	"93" : "GFD Warning",                               //
	"94" : "MC5 Warning",                               //
	"95" : "SPD",                                       //
	"96" : "Backfeed Protection",                       //
	"98" : "LPMS 통신 에러 (경고)",                         //
	"110" : "PEBB-eGBI Parameter Init",                 //
	"111" : "GI - OC Warning",                          //
	"112" : "Grid Over Voltage(Islanding)",             //
	"113" : "Grid Under Voltage(Islanding)",            //
	"114" : "Grid Over Frequency(Islanding)",           //
	"115" : "Grid Under Frequency(Islanding)",          //
	"117" : "Grid Over Freq Warning Level2",            //
	"118" : "Grid Under Freq Warning Level2",           //
	"120" : "Test Mode",                                //
	"125" : "Invalid Parameter",                        //
	"134" : "SMPS AC",                                  //
	"135" : "SMPS DC",                                  //
	"142" : "AC DOOR OPEN",                             //
	"143" : "DC DOOR OPEN"                              //
}
pcs.alarm = {
	"1" : "Heavy Fault",                                //
	"2" : "CB1(BATT CB)",                               //
	"3" : "CB1A(초기 충전)",                               //
	"5" : "MC1(Point of common coupling)",              //
	"6" : "CB3(GRID or LOAD CB - 수동 스위치)",            //
	"9" : "배터리측 고장",                                  //
	"10" : "PCS 측 고장",                                 //
	"11" : "GRID측 고장",                                 //
	"31" : "SYSTEM 명령 상태"                              //
}