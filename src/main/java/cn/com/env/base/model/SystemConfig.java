package cn.com.env.base.model;

import com.baidu.disconf.client.common.annotations.DisconfFile;
import com.baidu.disconf.client.common.annotations.DisconfFileItem;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;


@Service
@DisconfFile(filename = "systemConfig.properties")
@Scope("singleton")
public class SystemConfig {

    /**
     * 是否触发查询phoneTag
     */
    private boolean triggerPhoneTagMethod = false;


    private boolean useLocalMethod = true;

    private Integer testDat = 1;

    @DisconfFileItem(name = "use.local.method")
    public boolean isUseLocalMethod() {
        return useLocalMethod;
    }
    @DisconfFileItem(name = "test.dat.default")
    public Integer getTestDat() {
        return testDat;
    }
}
