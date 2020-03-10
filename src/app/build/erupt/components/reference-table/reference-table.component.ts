import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import {DataService} from "@shared/service/data.service";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { DataHandlerService } from "../../service/data-handler.service";
import { BuildConfig } from "../../model/build-config";
import { EruptModel } from "../../model/erupt.model";
import { RestPath } from "../../model/erupt.enum";
import { EruptFieldModel } from "../../model/erupt-field.model";
import { STColumn, STComponent } from "@delon/abc";

@Component({
  selector: "app-reference-table",
  templateUrl: "./reference-table.component.html",
  styleUrls: ["./reference-table.component.less"]
})
export class ReferenceTableComponent implements OnInit {

  @Input() referenceErupt: EruptModel;

  @Input() eruptField: EruptFieldModel;

  @Input() erupt: EruptModel;

  @Input() parentEruptName: string;

  @Input() mode: "radio" | "checkbox" = "radio";

  stConfig = new BuildConfig().stConfig;

  searchErupt: EruptModel;

  columns: any[];

  radioValue: any;

  checkedValues: any[];

  @ViewChild("st",{static: false}) st: STComponent;

  constructor(private dataService: DataService,
              @Inject(NzMessageService)
              private msg: NzMessageService,
              @Inject(NzModalService)
              private modal: NzModalService,
              private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.stConfig.req.headers["erupt"] = this.erupt.eruptName;
    this.stConfig.req.headers["eruptParent"] = this.parentEruptName;
    this.stConfig.url = RestPath.data + this.erupt.eruptName + "/reference-table/" + this.eruptField.fieldName;
    this.buildTableConfig();
    this.searchErupt = this.dataHandler.buildSearchErupt({ eruptModel: this.referenceErupt });
  }

  buildTableConfig() {
    const _columns: STColumn[] = [];
    _columns.push({
      title: "", type: this.mode, fixed: "left", width: "50px", className: "text-center",
      index: this.referenceErupt.eruptJson.primaryKeyCol
    });
    _columns.push(...this.dataHandler.viewToAlainTableConfig(this.referenceErupt, true));
    this.columns = _columns;
  }

  tableDataChange(event) {
    if (event.type === "radio") {
      this.radioValue = event.radio;
    } else if (event.type === "checkbox") {
      this.checkedValues = event.checkbox;
    }
  }

  query() {
    if (this.searchErupt.eruptFieldModels.length > 0) {
      this.stConfig.req.param = {};
      this.stConfig.req.param = this.dataHandler.eruptValueToObject({
        eruptModel: this.searchErupt
      });
    }
    this.st.load(1, this.stConfig.req.param);
  }

  clearCondition() {
    this.dataHandler.emptyEruptValue({ eruptModel: this.searchErupt });
  }

}